import { Octokit } from '@octokit/rest';
import { paginateRest } from '@octokit/plugin-paginate-rest';

const OctokitWithPaginate =
  Octokit.plugin ? Octokit.plugin(paginateRest) : Octokit;

const octokit = new OctokitWithPaginate({
  auth: import.meta.env.VITE_GH_TOKEN || undefined,
});

/**
 * Search repositories (single page)
 */
export const searchRepos = async (q: string, page = 1, per_page = 30) => {
  const res = await octokit.rest.search.repos({ q, page, per_page });
  return res.data;
}

/**
 * Search Topics (single page)
 */
export const searchTopics = async (q: string, page = 1, per_page = 30) => {
  const res = await octokit.rest.search.topics({ q, page, per_page });
  return res.data;
}