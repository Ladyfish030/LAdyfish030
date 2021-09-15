var nodejieba = require('nodejieba')
var fs = require('fs')
var file1 = fs.readFileSync('orig.txt').toString()
var file2 = fs.readFileSync('orig_0.8_del.txt').toString()
var path='D:/work/ruangong/3219005404/'
file1 = file1
  .replace('\n', '')
  .replace(/(^\s+)|(\s+$)/g, '')
  .replace(/\s/g, '')
file2 = file2
  .replace('\n', '')
  .replace(/(^\s+)|(\s+$)/g, '')
  .replace(/\s/g, '')

var data1 = file1.split('。')
var data2 = file2.split('。')
var len = Math.min(data1.length, data2.length)
var sum=0;
var all=0;
fast=0;
for(let i=0;i<len-1;i++){
  let result1 = nodejieba.tag(data1[i])
  let result2 = nodejieba.tag(data2[i])
  let len1=result1.length
  let len2=result2.length
  sum=0;
  for(let k=0;k<len1-1;k++){
    let res1=result1[k];
    let res2=result2[Math.min(len2-1,k+fast)]
    if(res1.tag==res2.tag){//如果两个词词性相同
      if(levenshteinDistance(res1.word,res2.word)<4){//重复率高
        sum+=1
      }else{
        fast+=1
      }
    }
  }
  all+=sum/len1;
  
}
console.log(all);//不重复率？
fs.writeFile(path + "test.txt", 100-all+'%',null, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
function levenshteinDistance(s,t){
  if(s.length>t.length){
      var temp=s;
      s=t;
      t=temp;
      delete temp;
  }
  var n=s.length;
  var m=t.length;
  if(m==0){
      return n;
  }
  else if(n==0){
      return m;
  }
  var v0=[];
  for(var i=0;i<=m;i++){
      v0[i]=i;
  }
  var v1=new Array(n+1);
  var cost=0;
  for(var i=1;i<=n;i++){
      if(i>1){
          v0=v1.slice(0);
      }
      v1[0]=i;
      for(var j=1;j<=m;j++){
          if(s[i-1].toLowerCase()==t[j-1].toLowerCase()){
              cost=0;
          }
          else{
              cost=1;
          }
          v1[j]=Math.min.call(null,v1[j-1]+1,v0[j]+1,v0[j-1]+cost);
      }
  }
  return v1.pop();
}

