// import React from 'react';
// import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
// // import { Edit, Delete } from '@mui/icons-material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const ProductList = ({ products, onEdit, onDelete }) => {
//     return (
//         <Grid container spacing={2}>
//             {products.map((prod) => (
//                 <Grid item xs={12} md={6} key={prod.id}>
//                     <Card>
//                         <CardContent>
//                             <Typography variant="h6">{prod.name}</Typography>
//                             <Typography>Brand: {prod.brand}</Typography>
//                             <Typography>Price: ₹{prod.price}</Typography>
//                             <Typography>Description: {prod.description}</Typography>
//                             {prod.image && <img src={prod.image} alt={prod.name} width={100} />}
//                             <div>
//                                 <IconButton onClick={() => onEdit(prod)}><EditIcon /></IconButton>
//                                 <IconButton onClick={() => onDelete(prod.id)}><DeleteIcon /></IconButton>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };

// export default ProductList;


import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductList = ({ products, onEdit, onDelete, isAdmin }) => {
    return (
        <Grid container spacing={2} mt={3}>
            {products.map((prod) => (
                <Grid item xs={12} md={6} key={prod.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{prod.name}</Typography>
                            <Typography>Brand: {prod.brand}</Typography>
                            <Typography>Price: ₹{prod.price}</Typography>
                            <Typography>Description: {prod.description}</Typography>
                            {prod.image && <img src={prod.image} alt={prod.name} width={100} />}
                            {isAdmin && (
                                <div>
                                    <IconButton onClick={() => onEdit(prod)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(prod.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;