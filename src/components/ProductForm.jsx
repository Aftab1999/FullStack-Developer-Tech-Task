import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const ProductForm = ({ onSubmit, product, onCancel }) => {
    const [form, setForm] = useState({
        name: '',
        brand: '',
        price: '',
        description: '',
        image: '',
        // specs: '{}'  // Initialize as stringified JSON
    });

    useEffect(() => {
        if (product) {
            // Convert specs object to string if it exists
            const specsStr = typeof product.specs === 'object'
                ? JSON.stringify(product.specs)
                : product.specs || '{}';
            setForm({ ...product, specs: specsStr });
        }
    }, [product]);

    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Parse specs safely
            let specsParsed = {};
            try {
                specsParsed = form.specs ? JSON.parse(form.specs) : {};
            } catch (err) {
                console.error('Invalid JSON in specs:', err);
                alert('Specs must be valid JSON');
                return;
            }

            const payload = {
                ...form,
                price: Number(form.price),
                specs: specsParsed
            };

            if (product) {
                await onSubmit(product.id, payload);
            } else {
                await onSubmit(payload);
            }

            // Reset form only if not in edit mode
            if (!product) {
                setForm({
                    name: '',
                    brand: '',
                    price: '',
                    description: '',
                    image: '',
                    specs: '{}'
                });
            }
        } catch (err) {
            console.error('Form submission error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {['name', 'brand', 'price', 'description',
                    //  'image'
                ].map((field) => (
                    <Grid item xs={12} sm={6} key={field}>
                        <TextField
                            fullWidth
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required={field !== 'image'}
                            type={field === 'price' ? 'number' : 'text'}
                        />
                    </Grid>
                ))}
                {/* <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Specs (JSON)"
                        name="specs"
                        value={form.specs}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        helperText="Enter specs as JSON (e.g., {'color':'red','size':'M'})"
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        {product ? 'Update' : 'Create'} Product
                    </Button>
                    {product && (
                        <Button
                            onClick={onCancel}
                            color="secondary"
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;
