import React, { useEffect, useState } from "react";
import { getImages, searchImages } from "./api";
import "./App.css";
import { SpinnerLoader } from "./Loader";
import { FiUpload } from 'react-icons/fi';
import { Link } from "react-router-dom";


const Home = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor,setNextCursor] = useState(null)
  const [searchValue,setSearchValue]= useState('')
  const [loadingPage,setLoadingPage] = useState(true)
  const [noSearchResult,setNoSearchResult] = useState(null)
  useEffect(() => {
    document.body.classList.add('bdy');
    const fetchData = async () => {
      const json = await getImages();
      setImageList(json.resources);
      setNextCursor(json.next_cursor)
      setLoadingPage(false)
    };
    fetchData();
    return () => {
      document.body.classList.remove('bdy');
    };
  }, []);
  const handleLoadMore = async()=>{
    const json = await getImages(nextCursor);
    setImageList((currentImageList)=>[...currentImageList, ...json.resources])
    setNextCursor(json.next_cursor);
  }
  const handleSearch = async(event)=>{
    setLoadingPage(true)
    setNoSearchResult(null);
    event.preventDefault();
    const responseJson = await searchImages(searchValue,nextCursor);
    if (responseJson.resources.length >= 1) {
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
      setLoadingPage(false);
    }else{
      setNoSearchResult(`Could not find any image or video matching ${searchValue}`)
      setLoadingPage(false)
    }
  }
  const handleFormReset = async ()=>{
    setLoadingPage(true);
    const responseJson = await getImages()
    setImageList(responseJson.resources);
    setLoadingPage(false);
    setNextCursor(responseJson.next_cursor);
    setSearchValue('')
    setNoSearchResult(null);
  }
  return (
    <>
    <form className="form" onSubmit={handleSearch}>
      <input value={searchValue} onChange={(event)=>{setSearchValue(event.target.value)}} type="text" required placeholder="Enter a search value..." />
      <button type="submit">Search</button>
      <button type="button" onClick={handleFormReset}>Clear</button>
    </form>
    <div>
        {noSearchResult && <h2 style={{textAlign:'center'}}>{noSearchResult}</h2>}
       {loadingPage && <SpinnerLoader/>}
      <div className="image-grid">
        {imageList.map((resource)=>(resource.resource_type === "image"? <img className="imgg" src={resource.url} alt={resource.public_id} key={resource.public_id} />: <video src={resource.url} muted autoPlay loop key={resource.public_id}></video>))}
      </div>
      <div className="footer">
      {nextCursor && <button onClick={handleLoadMore}>Load more</button>}
      </div>
      <button className="btnn"> <Link to={'/upload'}><FiUpload/></Link></button>
    </div>
    
    </>
  );
};
export default Home;
