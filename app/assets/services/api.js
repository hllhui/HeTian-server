import {stringify} from 'qs';
import request from '../utils/request';

const URL = 'http://localhost:7001'

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function queryStore() {
  return request(`/api/ht/store`);
}

export async function shopStatue(content) {
  return request(`/api/ht/daily/${JSON.stringify(content)}`);
}

export async function showVideo(content) {
  return request(`/api/ht/video`);
}

export async function delVideo(params) {
  return request(`/api/ht/video/${params}`, {
    method: 'DELETE',
    body: {
      method: 'delete',
    },
  });
}

export async function addVideo(params) {
  return request(`/api/ht/video`,{
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function createStore(params) {
  return request('/api/ht/store', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function removeRule(params) {
  return request(`/api/ht/store/${params}`, {
    method: 'DELETE',
    body: {
      method: 'delete',
    },
  });
}

export async function updateRule(params) {
  return request(`/api/ht/store/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function accountLogin(params) {
  return request('/api/ht/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
