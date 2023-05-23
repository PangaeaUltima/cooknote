import createApi from '@/api/index'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
})

const myPlugin = {
  install: (app) => {
    app.provide('api', createApi(api));
  },
};

export default myPlugin;