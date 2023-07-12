ESSAYE CA OU VA SUR CHAT GPT 


-------------------------------------------------------------------------------



Pour ceux qui galèrent sur PrivateRoute avec la V6 de React Router :

Dans PrivateRoute.tsx:

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';

const PrivateRoute= ({ redirectPath = '/login' }) => {
  if (!AuthenticationService.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;

};
export default PrivateRoute;


Dans App.tsx

...
<Routes>
  <Route path="*" element={<PageNotFound />} />
  <Route path="/login" element={<Login />} />

  <Route element={<PrivateRoute/>}>
    <Route path="/" element={<PokemonList />} />
    <Route path="/pokemons" element={<PokemonList />} />
    <Route path='pokemons/add' element={<PokemonAdd/>} />
    <Route path="/pokemons/:id" element={<PokemonsDetail/>} />
    <Route path='pokemons/edit/:id' element={<PokemonEdit/>} />
  </Route>

</Routes>