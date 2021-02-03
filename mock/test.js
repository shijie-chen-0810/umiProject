import herolist from './herolist.json';
export default {
  '/apq/web201605/js/herolist.json': herolist,
  '/apq/getherodetailbyid': (req, res) => {
    const id = req.query.id - 0;
    const detail = herolist.find((item) => {
      return item.ename === id;
    });
    res.send(detail);
  },
};
