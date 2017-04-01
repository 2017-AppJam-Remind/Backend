###Data Schema

	> name : 글을 올릴때 쓰는 익명 닉네임
	
	> weather : 포스팅 할때 날씨 String으로 1,2,3중 하나
	
	> memo : 포스팅을 하며 적는글 String
	
	> time : 포스팅할때의 시간 (서버에서 처리)
	
	> imageName : 포스팅을 하며 올리는 사진의이름 (서버에서 처리)
	
###/one, /two, /three (POST)

    > name : 글을 올릴때 쓰는 익명 닉네임 String
    	
    > weather : 포스팅 할때 날씨 String으로 1,2,3중 하나	
    
    > memo : 포스팅을 하며 적는글 String
    
###/get (POST)

    > location : 지역고유번호를 one, two, three중 하나로 보내면 그 지역에서 작성된 글 들을 JSON배열로 보냄 String