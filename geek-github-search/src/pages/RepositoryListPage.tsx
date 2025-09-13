
import { Box, Container, Typography } from "@mui/material";
import SingleInfo from "../components/SingleInfo";
import { useRepositoryListStore } from "../store/repository-list-store";

const RepositoryListPage = () => {
  const list = useRepositoryListStore((state) => state.list);
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
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
      </Box>
  );
}

export default RepositoryListPage;