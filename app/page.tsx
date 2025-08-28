'use client'

import React, { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://search-api.fie.future.net.uk/widget.php?id=review&site=TRD&model_name=iPad_Air'

// Please display the data in a tabular format.

// Bonus points for making the table sortable.

// Display the following data: Merchant logo, Merchant name, Product
// name, Product price (and currency) and Product affiliate link.

export default function Page() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => setData(json?.widget?.data?.offers))
      .catch(error => console.error(error));
  }, []);

  function sortByFields(e, order='DESC', field1: string, field2: string) {
    e.preventDefault();

    let dataToSort = [...data];

    dataToSort = dataToSort.sort((a, b) => {
      return order === 'DESC' 
        ? (a[field1][field2] > b[field1][field2] ? 1 : -1) 
        : (a[field1][field2] < b[field1][field2] ? 1 : -1);
    });

    setData(dataToSort);
  }

  const offers = data.map(offer =>
    <tr key={offer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td className="px-6 py-4 text-center">
        <p>
          <a href={offer.merchant.link} target='blank'>
            <img
              src={offer.merchant.logo_url}
              alt={offer.merchant.name}
              width={100}
              style={{
                maxHeight: "50px",
                maxWidth: "100%",
                margin: "auto",
              }}
            />
          </a>
        </p>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <a href={offer.offer.link} target='blank' className="float-left mr-2">{offer.offer.name}</a>
        <a href={offer.offer.link} target='blank' className="float-left"><img src="link.png" style={{width: "1em"}} /></a>
      </th>
      <td className="px-6 py-4 text-center">
        <p>{offer.offer.price} {offer.offer.currency_iso}</p>
      </td>
      <td className="px-6 py-4 text-center">
      <a href={offer.offer.link} target='blank'>
          <img
            src={`${offer.model_image}?v=${offer.id}`}
            alt={offer.offer.name}
            width={200}
            style={{
              maxWidth: "100%",
              margin: "auto",
            }}
          />
        </a>
      </td>
  </tr>
  );

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                      <p className=" text-lg">
                        <b className="mr-2">Merchant</b>
                      <a 
                        onClick={e => sortByFields(e, 'DESC', 'merchant', 'name')}
                        className="mr-2"
                      >&dArr;</a>
                      <a onClick={e => sortByFields(e, 'ASC', 'merchant', 'name')}>&uArr;</a>
                      </p>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <p className=" text-lg">
                      <b className="mr-2">Product</b>
                      <a 
                        onClick={e => sortByFields(e, 'DESC', 'offer', 'name')}
                        className="mr-2"
                      >&dArr;</a>
                      <a onClick={e => sortByFields(e, 'ASC', 'offer', 'name')}>&uArr;</a>
                    </p>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <p className=" text-lg">
                      <b className="mr-2">Price</b>
                      <a 
                        onClick={e => sortByFields(e, 'DESC', 'offer', 'price')}
                        className="mr-2"
                      >&dArr;</a>
                      <a onClick={e => sortByFields(e, 'ASC', 'offer', 'price')}>&uArr;</a>
                    </p>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <p className=" text-lg">Image</p>
                  </th>
              </tr>
          </thead>
          <tbody>
            {offers}
          </tbody>
      </table>
    </div>
  );

}