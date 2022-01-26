import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Search from "../components/Search";
import Menu from "../components/Menu";
import Nav from "../components/Nav";


function logs(props){
  const [devices, setDevices] = useState(props.posts.data);
  const [pagination, setPagination] = useState(props.posts.pagination);
  const [displayMenu, setDisplayMenu] = useState("");

  const [filters, setFilters] = useState({
    _limit: 3,
    _page: 1,
    _titleLike: "",
  });
  function handlePageChange(newPage) {
    console.log(newPage);
    console.log("ban vua click button prev or next");
    setFilters({
      ...filters,
      _page: newPage,
    });
  }
  useEffect(() => {
    const getApi = async () => {
      try {
        const paramString = queryString.stringify(filters);
        const url = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/v1/devices/gets?${paramString}`;
        let responJSON = await (await fetch(url)).json();
        const { data, pagination } = responJSON;
        setDevices(data);
        setPagination(pagination);
      } catch (error) {}
    };
    getApi();
  }, [filters]);

  function handleFilterChange(newFilter) {
    // reset page to 1
    setFilters({
      ...filters,
      _page: 1,
      _titleLike: newFilter.search,
    });
  }

  const handleClickHamburger = () => {
    console.log("handleClickHamburger", displayMenu);
    if (displayMenu === "inline") {
      setDisplayMenu("");
    } else {
      setDisplayMenu("inline");
    }
  };

  return (
    <>
      <Menu displayMenu={displayMenu} linkColor={1} />
      <div className="container">
        <Nav handleClickHamburger={handleClickHamburger} />
        <section className="section" id="section--2">
          <div className="content">
            <div className="container">
              <div className="content__search">
                <Search onSubmit={handleFilterChange} />
              </div>
              <div className="table__ss2-container">
                <Table id="table__ss2" devices={devices} />
              </div>
              <div className="content__paging">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch( `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/v1/devices/gets?_limit=3&_page=1&_titleLike=`);
  const posts = await res.json();
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}


export default logs

