/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var extend = require('util')._extend;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    console.log('app.get');
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    //console.log('req : ');
    //console.log(req);
    var comments = JSON.parse(data);
    //req.body['author'] = 'hardcode';
    console.log('orig req.body');
    console.log(req.body);
    var newObject = extend({}, req.body);
    newObject['author'] = 'hard_coded_author';
    newObject['text'] = 'hard_coded_text';
    console.log('after req.body');
    console.log(req.body);
    console.log('newObject');
    console.log(newObject);
    comments.push(newObject);
    var result = [];
    result.push(newObject);
    console.log('type of 2');
    console.log(typeof comments);
    console.log(typeof result);
    console.log('out ');
    console.log(comments);
    console.log(result);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(result);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('app.listen');
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
