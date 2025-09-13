import { useState } from "react";
import CheckboxWithInput from "../components/CheckboxWithInput";
import CustomInput from "../components/CustomInput";
import SearchButton from "../components/SearchButton";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormGroup,
  Grid,
  Typography
} from '@mui/material';
import { useRepositoryListStore } from "../store/repository-list-store";
import { useNavigate } from "react-router";
import CheckboxWithRadio from "../components/CheckboxWithRadio";
import { useSearchParamStore } from "../store/search-param-store";
import { buildQuerySimpler } from "../common/QueryStringBuilder";

const TopPage = () => {
    const [searchRepoValue, setSearchRepoValue] = useState('');
    const navigate = useNavigate();
    const fetchRepoList = useRepositoryListStore((state) => state.fetchList);
    const keyLabelItems = useSearchParamStore((state) => state.keyLabelItems);

    const handleRepoSearch = async (): Promise<void> => {
      await fetchRepoList(buildQuerySimpler(searchRepoValue, keyLabelItems), 1);
      navigate('/list');
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
          <Card>
            <CardHeader
              title={
                  <Typography variant="h6" component="h3">
                    Filter Options
                  </Typography>
                }
              />
              <FormGroup>
                { Object.entries(keyLabelItems).map(([key, item]) => (
                  item.type === "number" && (
                    <CheckboxWithInput key={key} label={key}/>) ||
                  item.type === "boolean" && (
                    <CheckboxWithRadio key={key} label={key}/>)
                    ))}
              </FormGroup>
          </Card>
        </Grid>
      </Container>
    </Box>
)}

export default TopPage;