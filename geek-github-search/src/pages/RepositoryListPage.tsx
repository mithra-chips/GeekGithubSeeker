
import { Box, Container, Typography } from "@mui/material";
import SingleInfo from "../components/SingleInfo";

const RepositoryListPage = () => {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        {/* Header */}
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
              Search Results
            </Typography>
          </Box>
        </Container>

        {/* Repository List */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Repository Single Item */}
              <SingleInfo repo={{
                id: 1,
                full_name: 'mock-repo',
                html_url: 'https://github.com/user/mock-repo',
                description: 'This is a mock repository.',
                stargazers_count: 123,
                forks_count: 45,
                open_issues_count: 6,
                language: 'TypeScript',
                license: { name: 'MIT' },
                updated_at: new Date().toISOString(),
                topics: ['react', 'typescript', 'mui']
              }} />
          </Box>
        </Container>
      </Box>
  );
}

export default RepositoryListPage;