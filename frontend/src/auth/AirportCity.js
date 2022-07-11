import React, { useState, useEffect } from 'react';
import SearchTable from "../componentsAiroportCity/SearchTable";
import SearchAutocomplete from "../componentsAiroportCity/SearchAutocomplete";
import AmadeusApi from "../amadeusApi";
import axios from "axios"
import SearchCheckboxes from "../componentsAiroportCity/SearchCheckboxes";
const CancelToken = axios.CancelToken;

const AirportCity = () => {

  const [search, setSearch] = useState({
    keyword: "a",
    city: true,
    airport: true,
    page: 0
  });

  // const [data, setData] = useState({
  //   keyword: '', 
  //   page: 0, 
  //   city: '',
  //   airport: ''
  // });

  const [dataSource, setDataSource] = useState({
    meta: { count: 0 },
    data: []
  });

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Turn on loader animation
    setLoading(true);
    getAmadeusData(search);
  }, [search]);

     const getAmadeusData = async (city, airport, keyword, page) => {
        const subType = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : ""
        // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
        const searchQuery = keyword ? keyword : "a";
        // This is extra tool for cancelation request, to avoid overload API 
        const source = CancelToken.source();
        // GET request with all params we need
        const out =
        //  AmadeusApi.getAirport(params,  {
        //   cancelToken: source.token
        // })
        await AmadeusApi.getAiportCity(searchQuery, page, subType, {
              cancelToken: source.token
            }).then(res => {
              // If we send too many request to the api per second - we will get an error and app will break
              // Therefore we implemented simple check to prevent error on client side.
              if (!res.data.code) {
                setDataSource(res.data); // dispatching data to components state
              }
              setLoading(false)
            }).catch(err => {
              axios.isCancel(err);
              setLoading(false)
            });
        return { out, source }
      };

    // If we returning function from *useEffect* - then this func will execute, when component will unmount
    // return () => {
    //   source.cancel()
    // }

  return (
    <div className="container">
      <div className="search-panel">
        <SearchAutocomplete search={search} setSearch={setSearch} />
        <SearchCheckboxes search={search} setSearch={setSearch} />
      </div>
      <SearchTable dataSource={dataSource} search={search} setSearch={setSearch} loading={loading} />
    </div>
  );
};

export default AirportCity;