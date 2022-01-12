import React from 'react';
import { PageTemplate } from '../components/base';
import { Article } from '../components/notice';

const NoticeDetail = () => {
  return (
    <PageTemplate headerTitle="공지사항">
      <Article />
    </PageTemplate>
  );
};

export default NoticeDetail;
