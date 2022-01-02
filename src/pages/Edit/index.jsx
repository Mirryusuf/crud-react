import Input from "../../components/Input";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';



const Edit = () => {
  const { _id } = useParams();
  const [nama, setNama] = useState('');
  const [stock, setStock] = useState();
  const [harga, setHarga] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();
  
  const handleStock = (e) => {
    if (e.target.value < 0) {
       setStock(0);
       return;
    }
    setStock(+e.target.value);
  };
  
  const handleStatus = () => setStatus(!status)

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

  // const updateData = async (e) => {
  //   e.preventDefault();
    
  //   //send data to server
  //   await axios.put(`http://127.0.0.1:5000/api/v2/product/${_id}`, {
  //     nama: nama,
  //     stock: stock,
  //     harga: harga,
  //     status: status
  //   })
  //   history.push("/");
  //   alert('berhasil edit data')
  // };

  const updateProduct = async (e) => {
    e.preventDefault();
    let message = [];
    if(nama.length === 0){
      message = [...message, ' Nama tidak boleh kosong '];
    }
    if(harga.length === 0){
      message = [...message, ' Harga tidak boleh kosong '];
    }
    if(message.length > 0){
      alert(message)
    }else{
      await axios.put(`http://127.0.0.1:5000/api/v2/product/${_id}`, {
      nama: nama,
      stock: stock,
      harga: harga,
      status: status
    })
    history.push("/");
    alert('berhasil edit data')
    }
  }
  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={ updateProduct }>
          <Input name="nama"  onChange={(e)=> setNama(e.target.value)} value={nama} type="text" label="Nama"/>
          <Input name="harga"  onChange={(e)=> setHarga(e.target.value)} value={harga} type="number" label="Harga"/>
          <Input name="stock"  onChange={handleStock} value={stock} type="number" label="Stock"/>
          <Input type="checkbox" onClick={handleStatus} checked={status} label="Active"/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;