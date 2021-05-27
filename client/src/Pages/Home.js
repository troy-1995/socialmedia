import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, GridColumn, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../Components/PostCard'
import { AuthContext } from '../Context/auth'
import PostForm from '../Components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/graphql'

const Home = () => {
  const { user } = useContext(AuthContext)

  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <TransitionGroup>
            {posts &&
              posts.map((post) => (
                <GridColumn key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </GridColumn>
              ))}
          </TransitionGroup>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
