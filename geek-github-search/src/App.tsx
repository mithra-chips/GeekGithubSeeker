import { useState } from 'react';
import './App.css';
import CheckboxGroup from './components/CheckboxGroup';
import CustomInput from './components/CustomInput';
import SearchButton from './components/SearchButton';
import SortButton from './components/SortButton';
import SingleInfo, { type Repo } from './components/SingleInfo';

function App() {
  const [searchRepoValue, setSearchRepoValue] = useState('');
  const [searchTopicValue, setSearchTopicValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [repo, setRepo] = useState<Repo | null>(null);

  const handleRepoSearch = async (): Promise<void> => {
    console.log('Searching for:', {
      repo: searchRepoValue
    });
    // This is a mock search result. Replace with actual API call.
    setRepo({
      id: 1,
      name: 'mock-repo',
      html_url: 'https://github.com/user/mock-repo',
      description: 'This is a mock repository.',
      stargazers_count: 123,
      forks_count: 45,
      open_issues_count: 6,
      language: 'TypeScript',
      license: { name: 'MIT' },
      updated_at: new Date().toISOString(),
    });
  };

    const handleTopicSearch = async (): Promise<void> => {
    console.log('Searching for:', {
      topic: searchTopicValue,
    });
  };

  const handleSortChange = (newSortValue: string) => {
    setSortValue(newSortValue);
    console.log('Sort changed to:', sortValue);
  };

  return (
    <>
      <div className="card">
          <CustomInput
            placeholder={'Search Repositories'}
            value={searchRepoValue}
            onChange={e => setSearchRepoValue(e.target.value)}
          />
          <SearchButton onClick={handleRepoSearch}>Search Repositories</SearchButton>

          <CustomInput
            placeholder={'Search Topics'}
            value={searchTopicValue}
            onChange={e => setSearchTopicValue(e.target.value)}
          />
          <SearchButton onClick={handleTopicSearch}>Search Topics</SearchButton>
        <CheckboxGroup />
      </div>
      <SortButton onSortChange={handleSortChange}></SortButton>
      {repo && <SingleInfo repo={repo}></SingleInfo>}
    </>
  );
}

export default App;
