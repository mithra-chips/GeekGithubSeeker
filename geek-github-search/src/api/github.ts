import { Octokit } from '@octokit/rest';
import { paginateRest } from '@octokit/plugin-paginate-rest';

const OctokitWithPaginate = Octokit.plugin(paginateRest);
const octokit = new OctokitWithPaginate({
  auth: import.meta.env.VITE_GH_TOKEN || undefined,
});

// a global request hook to handle errors
octokit.hook.wrap('request', async (request, options) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await request(options) as any;

    if (response.status === 200 && response.incomplete_results) {
      throw { status: 200, message: 'Incomplete results - narrow the search scope or wait for better network status.', errors: [] };
    }

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // (status 4xx-5xx)
    if (error.status) {
      switch (error.status) {
        case 403:
          {
            // For 403 errors, check the rate limit headers
            const remaining = error.response?.headers?.['retry-after'] 
              || (error.response?.headers?.['x-ratelimit-remaining'] === 0 ?error.response?.headers?.['x-ratelimit-reset'] : 0);
            const message = remaining > 0
              ? `API rate limit exceeded. Please wait ${remaining} seconds and try again.`
              : 'API rate limit exceeded. Please try again later.';
            throw { status: 403, message, errors: error.errors || [] };
          }
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
