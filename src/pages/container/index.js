/*
 * @Author: Daniel
 * @LastEditTime: 2020-06-02 10:12:35
 * @FilePath: /webmaster-front/src/pages/container/index.js
 */
import React, { Suspense,useEffect, useCallback, useState,lazy } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Route, Redirect, Switch } from 'react-router-dom'
import { actionCreators as ac } from './store'
import {connect} from 'react-redux';
import SelfHeader from '../../components/header';
import Snackbar from '@material-ui/core/Snackbar';
import Footer from '../../components/footer'
import './style.styl';

const Visit = lazy(()=>import('../visit'))
const Search = lazy(()=>import('../search'))
const Borrow = lazy(()=>import('../borrow'))
const PersonalCenter = lazy(()=>import('../personalcenter'))
const Renew = lazy(()=>import('../renew'))

const {Header} = Layout;

const Container = (props) => {
  // 获取store中的数据
  let {select, login, showAlert, message, messageType} = props;

  return (
    <div className="container-wrapper">
      {/* 用于全局提供报错与提示的组件 */}
      <Snackbar
        className="snackbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={showAlert}
        onClose={() => props.modifyShowAlert(false, '', '')}
        autoHideDuration={2000}
        message={message}
      >
        <div
          className={
            'alert-wrapper ' + (messageType === 'success' ? 'success' : (messageType === 'error' ? 'error' : 'warning'))
          }
        >
          {message}
        </div>
      </Snackbar>
       <SelfHeader/>
       <div className="my-body">
         {/** 未知的错误 */}
         <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/index/search" component={Search}/>
            <Route path="/index/borrow" component={Borrow}/>
            <Route path='/index/usercenter' component={PersonalCenter}/>
            <Route path="/index/renew" component={Renew}/>
            <Route path='/index/visit' component={Visit}/>
            <Redirect exact from="/index" to="/index/search"/>
          </Switch>
          </Suspense>
        </div>
        <Footer/>
    </div>
  )
}

const mapState = (state) => ({
  select: state.frame.get('select'),
  showAlert: state.frame.get('showAlert'),
  message: state.frame.get('message'),
  messageType: state.frame.get('messageType'),
})

const mapDispatch = (dispatch) => ({
  modifySelect(key) {
    dispatch(ac.modifySelect(key))
  },
  modifyLogin(state) {
    dispatch(ac.modifyLogin(state))
  },
  modifyUserInfo(info) {
    dispatch(ac.modifyUserInfo(info))
  },
  modifyShowAlert(show, message, type) {
    dispatch(ac.modifyShowAlert(show, message, type))
  },
})

export default connect(mapState, mapDispatch)(Container)
