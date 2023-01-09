import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from '../pages/main';
import Login from '../pages/user/login';
import CategoryReviews from '../pages/category/categoryReviews';
import Categories from '../pages/category/categories';
import CategoryCreate from '../pages/category/createCategory';

import Resources from '../pages/resources/allResources';
import ResourceReviews from '../pages/resources/resourceReviews';
import ResourceCreate from '../pages/resources/createResource';

import Reviews from '../pages/review/allReviews';
import ReviewCreate from '../pages/review/createReview';
import ReviewEdit from '../pages/review/editReview';
import ReviewsTable from '../pages/review/reviewsTable';
import Review from '../pages/review/singleReview';
import TagCreate from '../pages/tags/createTag';

import TagReviews from '../pages/tags/tagReviews';
import Tags from '../pages/tags/tags';

import Comments from '../pages/user/allComments';
import Register from '../pages/user/register';
import UserProfileEdit from '../pages/user/updateProfile';
import UserPage from '../pages/user/userPage';
import Dashboard from '../pages/dashboard';
import UsersTable from '../pages/user/usersTable';
import Notfound from '../pages/notfound';
import UserCreateReview from '../pages/review/userCreateReview';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Notfound />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/reviews/:id" element={<CategoryReviews />} />
      <Route path="/category/create" element={<CategoryCreate />} />

      <Route path="/resources" element={<Resources />} />
      <Route path="/resource/create" element={<ResourceCreate />} />

      <Route path="/resource/reviews/:id" element={<ResourceReviews />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/review/create" element={<ReviewCreate />} />
      <Route path="/review/edit/:id" element={<ReviewEdit />} />
      <Route path="/reviews/table" element={<ReviewsTable />} />
      <Route path="/review/:id" element={<Review />} />
      <Route path="/tag/create" element={<TagCreate />} />

      <Route path="/tag/reviews/:id" element={<TagReviews />} />
      <Route path="/tags" element={<Tags />} />

      <Route path="/comments" element={<Comments />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userpage/edit/:id" element={<UserProfileEdit />} />
      <Route path="/userpage/:id" element={<UserPage />} />
      <Route path="/userpage/creatreview/:id" element={<UserCreateReview />} />
      <Route path="/users" element={<UsersTable />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
