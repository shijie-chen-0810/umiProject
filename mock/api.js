import herolist from './herolist.json';
import projectList from './projectList.json';

export default {
  '/apq/web201605/js/herolist.json': herolist,
  '/apq/getherodetailbyid': (req, res) => {
    const id = req.query.id - 0;
    const detail = herolist.find((item) => {
      return item.ename === id;
    });
    res.send(detail);
  },
  '/apq/getprojectlist': projectList,
  'POST /apq/freeheros.json': (req, res) => {
    const { number } = req.body;
    function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  },
};
