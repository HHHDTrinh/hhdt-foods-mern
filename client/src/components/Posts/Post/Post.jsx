import React, { useRef } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import moment from 'moment';
import './Post.css';

import { likePost, deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const cardRef = useRef();

    const handleDelete = () => {
        cardRef.current.remove();
        dispatch(deletePost(post._id));
    };

    const handleLove = () => {
        dispatch(likePost(post._id));
    };

    return (
        <Card
            ref={cardRef}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '15px',
                height: '100%',
                position: 'relative',
            }}
        >
            <CardMedia
                sx={{
                    height: 0,
                    paddingTop: '56.25%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'darken',
                }}
                image={post.selectedFile}
                title={post.title}
            />
            <div className="overlay">
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="h6">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            <div className="overlayBtn">
                <Button
                    sx={{
                        color: 'white',
                    }}
                    size="small"
                    onClick={() => setCurrentId(post._id)}
                >
                    <MoreHorizIcon />
                </Button>
            </div>
            <div className="details">
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
                <Typography variant="h6" mb="0" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Country:&nbsp;
                    <span
                        style={{
                            color: '#ff7275',
                        }}
                    >
                        {post.country}
                    </span>
                </Typography>
                <CardContent
                    sx={{
                        p: '0',
                    }}
                >
                    <Typography
                        className="description"
                        variant="body1"
                        gutterBottom
                    >
                        {post.description}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        p: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        sx={{
                            gap: '4px',
                            minWidth: '30px',
                            p: '0',
                        }}
                        size="small"
                        color="error"
                        title="love"
                        onClick={handleLove}
                    >
                        <FavoriteBorderIcon fontSize="small" />
                        {post.loveCount}
                    </Button>
                    <Button
                        sx={{
                            gap: '4px',
                            minWidth: '30px',
                            p: '0',
                        }}
                        size="small"
                        color="success"
                        title="delete"
                        onClick={handleDelete}
                    >
                        <DeleteOutlinedIcon fontSize="small" />
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
};

export default Post;
