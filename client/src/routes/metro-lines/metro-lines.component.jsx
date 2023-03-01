import "./metro-lines.styles.scss"
import { useQuery, gql } from '@apollo/client';
import InfiniteScroll from "react-infinite-scroll-component";

const GET_METRO_LINES = gql`
query MetroLines ($after: String)
{
  stations: metroLines(first : 5,after : $after)
  {
    edges  {
      node {
        id
        name
        color
      }
    }
    pageInfo{
      endCursor,
      hasNextPage
  }
  }
}
`;

const  MetroLines = () => {


  const {loading, error, data, fetchMore} = useQuery(GET_METRO_LINES);

  const fetchMoreData = ()=>{
    console.log("loading more");
    let endCursor = data ? data.stations.pageInfo.endCursor : "";
    fetchMore({
      variables: {
        after: endCursor
      },
        updateQuery:(previousResult, {fetchMoreResult}) => {                           
          const newEdges = fetchMoreResult.stations.edges;
          const pageInfo = fetchMoreResult.stations.pageInfo;
            
          return newEdges.length ?
          {
            stations: {
            __typename: previousResult.stations.__typename,
            edges: [...previousResult.stations.edges, ...newEdges],
            pageInfo
            }
          }
          : previousResult;
        }
      })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if(data) {
    return (  
      <div className="lines-container">  
        <InfiniteScroll dataLength={data.stations.edges.length} 
                        next={fetchMoreData} hasMore={data.stations.pageInfo.hasNextPage} 
                        loader={<p>Loading...</p>}  
                        endMessage={<p style={{ textAlign: 'center' }}><b>You have seen it all!</b></p>}>
  
          {data.stations.edges.map(({node}) => (
            <div key={node.id} className = "line-container">
              <span className="line-name">Name : {node.name}</span>
              <span className="line-id">ID : {node.id}</span>
              <span className="line-color">Color : {node.color}</span>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );

  }
}

  
  export default MetroLines;
  