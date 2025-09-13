import { useState } from "react";
import CheckboxGroup from "../components/CheckboxGroup";
import CustomInput from "../components/CustomInput";
import SearchButton from "../components/SearchButton";
import SortButton from "../components/SortButton";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@mui/material';

const TopPage = ()   => {
    const [searchRepoValue, setSearchRepoValue] = useState('');
    const [sortValue, setSortValue] = useState('');

    const handleRepoSearch = async (): Promise<void> => {
    console.log('Searching for:', {
      repo: searchRepoValue
    });
  };

  const handleSortChange = (newSortValue: string) => {
    setSortValue(newSortValue);
    console.log('Sort changed to:', sortValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        py: 6,
      }}
      >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
            Geek GitHub Search
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Search for repositories on GitHub
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ m: 4, xs: 12, sm: 6 }}>
          <Card>
              <CardContent sx={{ p: 2 }}>
                  <Box sx={{ mb: 3 }}>
                      <CustomInput
                          placeholder={'Search Repositories'}
                          value={searchRepoValue}
                          onChange={e => setSearchRepoValue(e.target.value)}
                      />
                      <SearchButton onClick={handleRepoSearch}>Search Repositories</SearchButton>
                  </Box>
              </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ m: 4, xs: 12, sm: 6 }}>
          <CheckboxGroup />
        </Grid>
        <Grid sx={{ m: 4, xs: 12, sm: 6 }}>
          <SortButton onSortChange={handleSortChange} />
        </Grid>
      </Container>
    </Box>
)}

export default TopPage;