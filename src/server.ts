import app from './app';

const port = process.env.PORT || '3030';

app.app.listen(port, () => {
    console.log(`server running in" + ${port}`);
});
