import React from 'react';
import { Typography, Box, Chip, Card, CardContent } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import type { RepoItem } from '../store/repository-list-store';
interface SingleInfoProps {
    repo: RepoItem;
}

const SingleInfo: React.FC<SingleInfoProps> = ({ repo }) => {
    return (
        <Card key={repo.id}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                        {/* Repository Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Typography
                                variant="h6"
                                component="a"
                                href={repo.html_url}
                                sx={{
                                color: 'info.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                }}
                            >
                                {repo.full_name}
                            </Typography>
                        </Box>

                        {/* Description */}
                        <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ mb: 2, lineHeight: 1.6 }}
                        >
                            {repo.description}
                        </Typography>

                        {/* Topics */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Topics
                            </Typography>
                             {repo.topics.map((topic) => (
                                    <Chip
                                    key={topic}
                                    label={topic}
                                    size="small"
                                    clickable
                                    sx={{ fontSize: '0.75rem', m: 0.5 }}
                                    />
                                ))}
                        </Box>

                        {/* Repository Info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Language
                                </Typography>
                                 <Chip label = {repo.language} size="small" sx={{ fontSize: '0.75rem' }}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <StarBorderIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                {repo.stargazers_count}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ForkRightIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                {repo.forks_count}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Updated at {new Date(repo.updated_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SingleInfo;
