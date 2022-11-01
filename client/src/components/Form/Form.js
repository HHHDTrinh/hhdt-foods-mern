import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        country: '',
        description: '',
        tags: '',
        creator: '',
        selectedFile: '',
    });
    const post = useSelector((state) =>
        currentId
            ? state.posts.find((message) => message._id === currentId)
            : null,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleClear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            country: '',
            description: '',
            tags: [],
            creator: '',
            selectedFile: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost(postData));
            handleClear();
        } else {
            dispatch(updatePost(currentId, postData));
            handleClear();
        }
    };

    const handleFilechange = ({ name, base64, size, type }) => {
        if (
            type.split('/')[0] !== 'image' ||
            Number(size.split(' ')[0]) > 10000
        ) {
            toast.error('Only Images allowed!!');
            return;
        }
        setPostData({ ...postData, selectedFile: base64 });
    };

    return (
        <Paper
            sx={{
                m: 2,
            }}
        >
            <form
                autoComplete="off"
                noValidate
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '16px',
                    gap: '8px',
                }}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? 'Modified Food' : 'You want eat'}
                </Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                    }
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    name="country"
                    variant="outlined"
                    label="Country"
                    fullWidth
                    multiline
                    value={postData.country}
                    onChange={(e) =>
                        setPostData({ ...postData, country: e.target.value })
                    }
                />
                <TextField
                    name="description"
                    variant="outlined"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.description}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            description: e.target.value,
                        })
                    }
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (coma separated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.trim().split(','),
                        })
                    }
                />
                <div
                    style={{
                        width: '97%',
                        margin: '6px 0',
                    }}
                >
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={handleFilechange}
                    />
                </div>
                <Button
                    sx={{
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    {currentId ? 'Submit' : 'Add new'}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
