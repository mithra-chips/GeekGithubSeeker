import React from 'react';
import { Card, CardContent, Typography, Link, Box, Chip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import BugReportIcon from '@mui/icons-material/BugReport';
import GavelIcon from '@mui/icons-material/Gavel';

// Define the shape of a repository object based on GitHub API response
export interface Repo {
    id: number;
    name: string;
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
}

// Define the props for the SingleInfo component
interface SingleInfoProps {
    repo: Repo;
}

const StatItem: React.FC<{ icon: React.ReactNode; label: React.ReactNode }> = ({ icon, label }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, color: 'text.secondary' }}>
        {icon}
        <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
            {label}
        </Typography>
    </Box>
);


const SingleInfo: React.FC<SingleInfoProps> = ({ repo }) => {
    const lastUpdated = new Date(repo.updated_at).toLocaleDateString();

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" underline="hover">
                    <Typography variant="h6" component="div" sx={{ wordBreak: 'break-all' }}>
                        {repo.name}
                    </Typography>
                </Link>

                <Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>
                    {repo.description || 'No description provided.'}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 1 }}>
                    {repo.language && (
                        <Chip label={repo.language} size="small" sx={{ mr: 2, mb: 1 }} />
                    )}
                    <StatItem icon={<StarBorderIcon fontSize="small" />} label={repo.stargazers_count.toLocaleString()} />
                    <StatItem icon={<ForkRightIcon fontSize="small" />} label={repo.forks_count.toLocaleString()} />
                    <StatItem icon={<BugReportIcon fontSize="small" />} label={repo.open_issues_count.toLocaleString()} />
                    {repo.license && (
                        <StatItem icon={<GavelIcon fontSize="small" />} label={repo.license.name} />
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto', pl: 1 }}>
                        Updated on {lastUpdated}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SingleInfo;
