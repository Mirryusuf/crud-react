import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toRupiah from '@develoka/angka-rupiah-js';
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './index.scss';

const Home = () => {
  let [product, setProduct] = useState([]);
  let [search, setSearch] = useState('');

  // const searchApi = async () => {
  //   try {
  //       let keyword = search;
  //       await axios
  //       .get('http://127.0.0.1:5000/api/v2/product?search=' + keyword)
  //       .then((response) => {
  //         setNews(response.data)                
  //         // console.log(response.data);
  //       });
  //   } catch(e){
  //       console.log(e);
  //   }
  // };

  const callApi = async () => {
    try {
        await axios
        .get('http://127.0.0.1:5000/api/v2/product')
        .then((response) => {
          setProduct(response.data)                
          // console.log(response.data);
        });
    } catch(e){
        console.log(e);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    let keyword = search;
    axios.get('http://127.0.0.1:5000/api/v2/product?search=' + keyword)
    .then((response) => {
      setProduct(response.data)                
      // console.log(response.data);
    });
  }, [search]);

  const deleteProduct = async (_id) => {
    await axios.delete(`http://127.0.0.1:5000/api/v2/product/${_id}`);
    callApi();
    alert('berhasil hapus data')
  }


  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            product.map(item => (
            <>
            <tr>
              <td key={item._id}>{item._id}</td>
              <td>{item.nama}</td>
              <td className="text-right">{(toRupiah(item.harga))}</td>
              <td className="text-center">
                <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">Edit</Link>
                <button onClick={ () => deleteProduct(item._id) } className="btn btn-sm btn-danger">Delete</button>
              </td>  
            </tr>
            </>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;