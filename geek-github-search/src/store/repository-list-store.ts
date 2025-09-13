import { create } from 'zustand'
import { searchRepos } from '../api/github'

type State = {
  list: RepoItem[]
}

type Actions = {
  fetchList: (queryString: string, page: number) => Promise<void>
}

export interface RepoItem {
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string | null;
    license: {
        name: string;
    } | null;
    updated_at: string;
    topics: string[];
}

export const useRepositoryListStore = create<State & Actions>((set) => ({
  list: [],
  fetchList: async (queryString: string, page: number) => {
      const data = await searchRepos(queryString, page);
      const items = data.items.map((item) => ({ ...item, topics: item.topics ?? [] }));
      set({ list: items as RepoItem[] })
  },
}))

