const GetChatId = (s1,s2) =>  {
  if(parseInt(s1) < parseInt(s2)){
    return s1+"_"+s2
  }
  return s2+"_"+s1
}

export default GetChatId;