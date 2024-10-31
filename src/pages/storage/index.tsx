import { Box, Checkbox, FormControlLabel, Grid, Pagination, Typography } from "@mui/material";
import Layout from "../../layout/homepage";
import Theme from '../../config/theme';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import CustomSearchBar from "./CustomSearchBar";
import VideoCard from './VideoCard';

const Storage = () => {
    const videos = [
        { title: 'Video Translation - 1', status: 'Processing', date: '1 minute ago', img: 'video_placeholder.jpg' },
        { title: 'Voice Generation - 2', status: 'Processing', date: '1 minute ago', img: 'audio_placeholder.jpg' },
        { title: 'Subtitle Generation - 3', status: 'Completed', date: '1 minute ago', img: 'subtitle_placeholder.jpg' },
        { title: 'Text Generation - 4', status: 'Processing', date: '15 minutes ago', img: 'text_placeholder.jpg' },
        { title: 'Lip Synchronization - 5', status: 'Processing', date: '30 minutes ago', img: 'lip_sync_placeholder.jpg' },
        { title: 'Video Translation - 6', status: 'Failed', date: '3 years ago', img: 'video_placeholder.jpg' },
        { title: 'Video Translation - 7', status: 'Completed', date: '4 years ago', img: 'video_placeholder.jpg' },
        { title: 'Video Translation - 8', status: 'Completed', date: '4 years ago', img: 'video_placeholder.jpg' },
        { title: 'Video Translation - 9', status: 'Completed', date: '5 years ago', img: 'video_placeholder.jpg' },
    ];

    return (
        <Layout>
            <Box display='flex'>
                <Box width='260px' padding='20px' display='flex' flexDirection='column' alignItems='center' style={{
                    borderRight: '2px solid #e0e0e0',
                }}>
                    <Typography variant="h5" gutterBottom style={{
                        color: Theme.palette.secondary.main, 
                        fontWeight: 'bold',
                        marginBottom: '30px'
                    }}>My Storage</Typography>
                    <Box paddingLeft='10px' display='flex' flexDirection='column' >
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="All" />
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="Video translation" />
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="Text generation" />
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="Subtitle generation" />
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="Voice generation" />
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="Lip synchronization" />
                        <FormControlLabel 
                            control={
                                    <BookmarkBorderOutlinedIcon fontSize="large" sx={{ color: "#f9b207", marginLeft: '5px', marginRight: '3px' }} />
                            } 
                            sx={{ marginBottom: '5px' }}
                            label="My Favorites" 
                        />

                        <Box sx={{ width: '100%', margin: '10px auto', borderBottom: '2px solid #ccc' }}></Box>

                        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }} gutterBottom>Status</Typography>
                        <FormControlLabel control={<Checkbox sx={{ color: 'green' }} />} sx={{ marginBottom: '5px', color: 'green' }} label="Success" />
                        <FormControlLabel control={<Checkbox sx={{ color: 'blue' }} />} sx={{ marginBottom: '5px', color: 'blue' }} label="Processing" />
                        <FormControlLabel control={<Checkbox sx={{ color: 'red' }} />} sx={{ marginBottom: '5px', color: 'red' }} label="Failed" />
                        <FormControlLabel control={<Checkbox />} sx={{ marginBottom: '5px' }} label="Raw" />
                    </Box>
                </Box>

                {/* Main Content */}
                <Box flex='1' paddingTop='20px' paddingLeft='40px' paddingRight='40px'>
                    {/* Search and filter bar */}
                    <Box display='flex' justifyContent='space-between' paddingLeft='100px' marginBottom='20px'>
                        <CustomSearchBar />
                        <AlignHorizontalRightIcon fontSize='large' />
                    </Box>

                    {/* Grid of videos */}
                    <Grid container spacing={2}>
                    {videos.map((video, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <VideoCard video={video} />
                        </Grid>
                    ))}
                    </Grid>
                    
                    {/* Pagination */}
                    <Box mt={4} display="flex" justifyContent="center">
                        <Pagination count={3} color="primary" /> {/* Adjust count as needed */}
                    </Box>
                    {/* <Box mt={4} display="flex" justifyContent="center">
                    <Button variant="outlined">1</Button>
                    <Button variant="outlined">2</Button>
                    <Button variant="outlined">3</Button>
                    </Box> */}
                </Box>
            </Box>
        </Layout>
    )
}

export default Storage;