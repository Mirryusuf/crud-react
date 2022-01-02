import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toRupiah from '@develoka/angka-rupiah-js';
import { useParams} from 'react-router-dom';
import './index.scss';

const Detail = () => {
  const { _id } = useParams();
  const [nama, setNama] = useState('');
  const [stock, setStock] = useState();
  const [harga, setHarga] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/v2/product/${_id}`)
    .then(res => {
      // console.log(res.data);
      setNama(res.data.nama);
      setHarga(res.data.harga);
      setStock(res.data.stock);
      setStatus(res.data.status);
    })
    .catch(err => {
      console.log(err);
    })    
  }, [_id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {_id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {nama}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {harga}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;