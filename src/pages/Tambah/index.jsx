
import Input from '../../components/Input';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const Tambah = () => {
  const [nama, setNama] = useState('');
  const [stock, setStock] = useState(0);
  const [harga, setHarga] = useState('');
  const [status, setStatus] = useState(false)
  const history = useHistory();
  
  const handleStock = (e) => {
    if (e.target.value < 0) {
       setStock(0);
       return;
    }
    setStock(+e.target.value);
  };
  
  const handleStatus = () => setStatus(!status)

  const saveProduct = async (e) => {
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
      await axios.post('http://127.0.0.1:5000/api/v2/product',{
        nama: nama,
        stock: stock,
        harga: harga,
        status: status
      })
      history.push("/");
      alert('berhasil tambah data');
    }
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={ saveProduct }>
          <Input name="nama" type="text" placeholder="Nama Produk..." label="Nama" onChange={ (e) => setNama(e.target.value)}/>
          <Input name="harga" type="number" placeholder="Harga Produk..." label="Harga" onChange={ (e) => setHarga(e.target.value)}/>
          <Input name="stock" value={stock} type="number" placeholder="Stock Produk..." label="Stock" onChange={handleStock}/>
          <Input onClick={handleStatus} checked={status} type="checkbox" label="Active" />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;