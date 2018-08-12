import React, { Component } from 'react';
import { API, graphqlOperation } from "aws-amplify";

class Post extends Component {

    state = {
        posts: [],
        post: ''
    }

    listAllPosts = async () => {
        const ListPosts = `query ListPosts {
            listPosts {
                id
                title
            }
        }`;

        const allPosts = await API.graphql(graphqlOperation(ListPosts));
        this.setState({
            posts: allPosts.data.listPosts || []
        });
        return allPosts.data.listPosts;
    }

    createNewPost = async () => {
        const CreatePost = `mutation CreatePost($title: String!) {
            putPost(title: $title) {
                id
                title
            }
        }`;

        // Mutation
        const postDetails = {
            title: this.state.post
        };

        await API.graphql(graphqlOperation(CreatePost, postDetails));
        this.setState({ post: '' });
        this.listAllPosts();
    }

    componentDidMount() {
        this.listAllPosts();
    }

    render() {
        return (
            <div>
                <h2>My Posts</h2>
                <div>
                    <input type="text" value={this.state.post} onChange={(e) => { this.setState({ post: e.target.value }) }} /> &nbsp;
                    <button onClick={this.createNewPost}>Add Post</button>
                </div>
                <ul>
                    {
                        this.state.posts.map((item) => {
                            return <li key={item.id}>{item.title}</li>;
                        })
                    }
                </ul>

            </div>
        )
    }
}

export default Post