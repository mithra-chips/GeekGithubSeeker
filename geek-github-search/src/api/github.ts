import { Octokit } from '@octokit/rest';
import { paginateRest } from '@octokit/plugin-paginate-rest';
import type { AlertColor } from '@mui/material';

const OctokitWithPaginate = Octokit.plugin(paginateRest);
const octokit = new OctokitWithPaginate({
  auth: import.meta.env.VITE_GH_TOKEN || undefined,
});

// a global request hook to handle errors
octokit.hook.wrap('request', async (request, options) => {
  const getSeverity = (status: string): AlertColor => {
    if(!status)
      return 'info';
    if (status.startsWith('4')) {
      return 'warning';
    }
    if (status.startsWith('5')) {
      return 'error';
    }
    return 'info';
  };
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await request(options) as any;

    if (response.status === 200 && response.incomplete_results) {
      throw { status: '200', message: 'Incomplete results. Narrow the search scope or wait for better network status.' };
    }

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // (status 4xx-5xx)
    if (error?.status) {
      switch (error.status) {
        case 403:
          {
            // For 403 errors, check the rate limit headers
            const remaining = error.response?.headers?.['retry-after'] 
              || (error.response?.headers?.['x-ratelimit-remaining'] === 0 ?error.response?.headers?.['x-ratelimit-reset'] : 0);
            const message = remaining > 0
              ? `API rate limit exceeded. Please wait ${remaining} seconds and try again.`
              : 'API rate limit exceeded. Please try again later.';
            throw { status: 'warning', message };
          }
        default:
          throw { status: getSeverity(String(error.status)), message: error.message || 'An error occurred' };
        }
      }
      // reject promise
      throw error;
  }
});

/**
 * Search repositories (single page)
 */
export const searchRepos = async (q: string, page = 1, per_page = 30) => {
  const res = await octokit.rest.search.repos({ q, page, per_page });
  return res.data;
};
