/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

 SPDX-License-Identifier: GPL-2.0

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import { stringify } from "query-string";

const sendRequest = ({
  url,
  method,
  credentials = null,
  body,
  headers = {},
  queryParams,
  isMultipart = false,
  noHeaders = false,
}) => {
  let mergedHeaders;
  if (isMultipart) {
    mergedHeaders = new Headers({ ...headers });
  } else {
    mergedHeaders = new Headers({
      "content-type": "application/json",
      ...headers,
    });
  }
  if (noHeaders) {
    mergedHeaders = {};
  }
  const options = {
    method,
    headers: mergedHeaders,
    body,
  };
  let URL = url;
  if (body) {
    if (isMultipart) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
  } else {
    options.body = null;
  }
  if (credentials) {
    options.credentials = credentials;
  }
  if (queryParams) {
    URL = `${url}?${stringify(queryParams)}`;
  }
  return fetch(URL, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((json) => {
      return Promise.reject(
        new Error({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        })
      );
    });
  });
};

export default sendRequest;
