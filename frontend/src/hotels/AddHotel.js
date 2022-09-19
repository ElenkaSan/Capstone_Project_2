import React, { 
  // useContext,
   useState } from "react";
// import { Link } from "react-router-dom";
// import Api from "../api";
import AmadeusApi from "../amadeusApi";

import HotelDetail from "./HotelDetail";
// import HotelCard from "./HotelCard";
import SearchHotels from "./SearchHotels";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from 'react-bootstrap/Alert'
import '../flights/flight.css'
import "toasted-notes/src/styles.css";
// import useLocalStorage from "../hooks/useLocalStorage";

//AddHotel component renders all hotels that are in the Api Amadeus.
//  app backend database. 
//A user can filter using the inputs in the child component "SearchHotels".
//A user can also click on a button to safe hotel such as remove this hotel.
//If a user has saved, the hotel info card will show it has been saved to and will show the remove button.

const AddHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [show, setShow] = useState(true);
    const [hasErrors, setHasErrors] = useState(false);

    // const [trip, setTrip] = useLocalStorage(null);
    // const [trip, setTrip] = useState([]);
    // const { isLoggedIn } = useContext(UserContext);

    //upon initial load, show all hotels for the choosen dates.
    const findHotels = async (formData) => {
        try {
            let res = await AmadeusApi.getHotelByCity(
                                                         formData.cityCode, 
                                                         formData.checkInDate,
                                                         formData.checkOutDate
                                                         );
            console.log("Hotels", res)
            if (res.message === "success") {
              return res.json();
            }
            else {
              setHasErrors(true);
            }
            setHotels(res);
          }
         catch (e) {
          console.error(e.message);
          setShow(true);
          setHasErrors(true);
        }
    }

    // const deleteItem = hotelId => {
    //   const hotels = hotels.filter(hotel => {
    //     return hotel.hotelId !== hotelId;
    //   });
    //   setHotels({ hotels });
    // };

    // const getHotelInfoFromButton = (hotelObject) => {
    //   if (!trip) {
    //     toast.notify(
    //       "Please create an account before attempting to save a trip.",
    //       {
    //         position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
    //         duration: 10000 // This notification will not automatically close
    //       }
    //     );
    //   } else {
    //     updateDB(trip, hotelObject);
    //     console.log("hotel is updated");
    //   }
    // }

    // const db = async (hotelId) => {
    //   // const response = await axios.put(`/savehotel/${trip_id}`, requestOptions);
    //   let trip = Api.addingHotel(isLoggedIn.username, hotelId); 
    //     setTrip(trip);
    //   const body = await trip;
    //   if (trip.status !== 200) {
    //     toast.notify(
    //       "We are having a little trouble saving your information - please try again.",
    //       {
    //         position: "top", // top-left, top, top-right, bottom-left, bottom, bottom-right
    //         duration: 5000 // This notification will not automatically close
    //       }
    //     );
    //     throw Error(body.message);
    //   } else {
    //     toast.notify("Your hotel has been saved.", {
    //       position: "bottom", // top-left, top, top-right, bottom-left, bottom, bottom-right
    //       duration: 2000 // This notification will not automatically close
    //     });
    //   }
    //   return body;
    // };
    // const updateDB = (hotelId, hotelInfo) => {
    //   // POST request using fetch inside useEffect React hook
    //   const isLoggedIn = {
    //     hotel: hotelInfo
    //   };
    //   db(isLoggedIn.username, hotelId).then(data => console.log(data));
    //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // };
  


    if (!hotels) return <LoadingSpinner />;
    
    return (
      <div className="p-4">
            <SearchHotels findHotels={findHotels} />
        {hotels.data ? ( 
        <div className='text-light'> 
        {hotels.data.length === 0 ? ( <p className="card p-2 bg-danger lead font-weight-bold col-md-8 offset-md-2 text-center">
         Sorry, there are {hotels.data.length} hotel results! </p>) : ''}
        {hotels.data.map((hotel) => (
          <HotelDetail
          // <HotelCard
           key={hotel.hotel.hotelId.toString()} hotel={hotel} 
          // getHotelInfoFromButton={getHotelInfoFromButton}
          />
          ))} 
        </div>
      ) : (
        <>
         {hasErrors
                  ?
                  ( <>
                    <Alert show={show} variant="dark" className="bg-danger lead font-weight-bold text-center col-md-8 offset-md-2 p-2"> 
                      <div className="fade show">
                      {/* <div className="alert alert-dismissible fade show"> */}
                      <p> 
                       {/* className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">  */}
                      Sorry, no results were found!</p>
                       {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}>
                          <span aria-hidden="true"> &times; </span> 
                        </button>  */}
                      </div>
                    </Alert>
                    {/* {!show && <Button className="btn btn-sm btn-outline-danger float-right" onClick={() => setShow(true)} type="Show Alert">
                    <FiAlertCircle />
                    </Button>} */}
                  </> )
                  : null}
                  </>
        )} 
        <br/> 
        </div>
    )
}

export default AddHotel;

// import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Api from "../api";
// import AmadeusApi from "../amadeusApi";
// import ReactPaginate from 'react-paginate';
// // import HotelDetail from "./HotelDetail";
// import HotelCard from "./HotelCard";
// import SearchHotels from "./SearchHotels";
// import LoadingSpinner from "../common/LoadingSpinner";
// // import moment from 'moment';
// import '../flights/flight.css'
// // import {
// //   CircularProgress
// // } from "@material-ui/core";

// const HotelsList = () => {
//     const [hotels, setHotels] = useState([]);
//     const [hotelsPerPage] = useState(5);
//     const [offset, setOffset] = useState(1);
//     const [pageCount, setPageCount] = useState(0)

//     const getData = (hotels) => {
//       console.log("HOTELS",hotels)
//       return (
//          <div>
//            {hotels.data.map((hotel) => (
//           // console.log(hotel)
//           <HotelCard
//                 key= {hotel.id} 
//                 hotel={hotel}
//           />
//           ))} 
//          </div>
//        )
//      }

//     //hotel offer Mia 
//     const findHotels = async (formData) => {
//         try {
//             let result = await AmadeusApi.getHotelByCity(formData.cityCode, 
//                                                          formData.checkInDate,
//                                                          formData.checkOutDate
//                                                          );
//             console.log("HOTELS",result)
//             const endOffset = offset - 1 + hotelsPerPage;
//             console.log(`Loading items from ${offset} to ${endOffset}`);
//             const slice = result.slice(offset - 1 , endOffset)
//             // For displaying Data
//             const postData = getData(slice)
//             // Using Hooks to set value
//             setHotels(postData)
//             setPageCount(Math.ceil(result.length / hotelsPerPage))
//           }
//          catch (e) {
//           console.error(e);
//         }
//     }

//     const handlePageClick = (event) => {
//       const selectedPage = event.selected;
//       setOffset(selectedPage + 1)
//     }

//     // useEffect(() => {
//     //   findHotels()
//     // }, [offset])

//     if (!hotels) return <LoadingSpinner />;

//     return (
     
//       <div className="p-4">
//          {/* {console.log(hotels.data)} */}
//             <SearchHotels findHotels={findHotels} />
//            {/* {hotels.length === 0 ? ( */}
           
//           {/* {Array.isArray(hotels.data) ? ( */}
//           {!hotels.length ? ( 
//         <div className='text-light'> 
//         {/* {console.log("HOTELS",hotels)} */}
//         {hotels}
//         <div className="d-flex justify-content-center">
//         <ReactPaginate
//           previousLabel={"<"}
//           nextLabel={">"}
//           breakLabel={"..."}
//           breakClassName={"break-me"}
//           pageCount={pageCount}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           subContainerClassName={"pages pagination"}
//           activeClassName={"active"} />
//       </div>
//         </div>
//       ) : ( 
//           <p className="card bg-danger text-light lead font-weight-bold text-center col-md-8 offset-md-2 p-2">
//             Sorry, no results were found!</p>
//         )} <br/> 
//         </div>
//     )
// }

// export default HotelsList;