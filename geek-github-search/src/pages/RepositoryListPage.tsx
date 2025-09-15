
import { Box, Container, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import SingleInfo from "../components/SingleInfo";
import { useRepositoryListStore } from "../store/repository-list-store";
import {Link, useLocation, useNavigate } from "react-router";
import { useSearchParamStore } from "../store/search-param-store";
import { buildQuerySimpler } from "../common/QueryStringBuilder";
import Loading from "../components/Loading";
import type { ChangeEvent } from "react";
import { useApiHook } from "../api/api-hook";
import ErrorPopUp from "../components/ErrorPopUp";


const RepositoryListPage = () => {
  // State and Hooks
  const fetchRepoList = useRepositoryListStore((state) => state.fetchList);
  const isLoading = useRepositoryListStore((state) => state.loading);
  const list = useRepositoryListStore((state) => state.list);
  const totalCount = useRepositoryListStore((state) => state.totalCount);
  
  const keyLabelItems = useSearchParamStore((state) => state.keyLabelItems);
  const searchRepoValue = useSearchParamStore((state) => state.searchRepoValue);
  const location = useLocation();
  const navigate = useNavigate();
  const { callApi, error } = useApiHook();
  
  // parameters
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  // Fetch repository list when page number changes
  const pageChanged = (_: ChangeEvent<unknown>, value: number) => {
    const handleRepoSearch = async (): Promise<void> => {
      await callApi(fetchRepoList(buildQuerySimpler(searchRepoValue, keyLabelItems), value));
      navigate(`/list?page=${value}` );
    };

    handleRepoSearch();
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {isLoading && <Loading />}
      {error && <ErrorPopUp error={error}  />}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
            Search Results
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Repository Single Item */}
          {list.map(repo => (<SingleInfo key={repo.id} repo={repo} />))}
        </Box>
      </Container>

      <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Pagination
            page={page}
            count={Math.ceil(totalCount / 30)}
            onChange={pageChanged}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/list${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
            variant="outlined"
            shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default RepositoryListPage;