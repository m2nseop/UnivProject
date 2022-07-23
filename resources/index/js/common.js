$(document).ready(function() {
	init();
	initTech();
});

// contents 3 에서 가로로 스크롤할때 밑에 점 3개
function initTech(){
	var controller = new ScrollMagic.Controller();

	var wipeAnimation = new TimelineMax()
	// animate to second panel
		.to("#slideContainer", 1,   {x: "-33.3333%"})	// move in to first panel
		// animate to third panel
		.to("#slideContainer", 1,   {x: "-66.6666%"})

	// create scene to pin and link animation
	new ScrollMagic.Scene({
			triggerElement: "#before-tech",
			triggerHook: "onLeave",
			duration: "500%"
		})
		.setPin("#tech")
		.setTween(wipeAnimation)
		.addTo(controller);
}

function init(){
	!function(t){t.fn.bcSwipe=function(e){var n={threshold:50};return e&&t.extend(n,e),this.each(function(){function e(t){1==t.touches.length&&(u=t.touches[0].pageX,c=!0,this.addEventListener("touchmove",o,!1))}function o(e){if(c){var o=e.touches[0].pageX,i=u-o;Math.abs(i)>=n.threshold&&(h(),t(this).carousel(i>0?"next":"prev"))}}function h(){this.removeEventListener("touchmove",o),u=null,c=!1}var u,c=!1;"ontouchstart"in document.documentElement&&this.addEventListener("touchstart",e,!1)}),this}}(jQuery);
	 

	$("body").keydown(function(key) {
		if(key.keyCode==116){
			$("input").blur();
		}
	});

	$('.carousel').carousel({interval: false});
	
	$("#start").on("click", subwindowlogin); //시작하기
	
	$("#authentic-start").on("click", function(){ //시작하기
		location.href="/campaign";
	});
	
	$("#LOGIN").on("click", subwindowlogin);
	
	function subwindowlogin(){ //로그인 
		$("input").blur();
		$(".sub-window").removeClass("show");
		var subWindow = $("#bg-LOGIN.sub-window");
		subWindow.addClass("show");

		var rememberId=localStorage.getItem("rememberId");
		var rememberPw=localStorage.getItem("rememberPw");
		
		if(rememberId!=null){
			$("#uId").val(rememberId);
			$("#uPw").val(rememberPw);
			$("#Remember-check").prop("checked",true);
		}
		$("input").blur();
	}
	
	$("#JOIN").on("click", function(e){ // 회원가입
		$(".sub-window").removeClass("show");
		var subWindow = $("#bg-JOIN.sub-window");
		subWindow.addClass("show");
	});
	
	$("#submitJOIN").on("click", function(e){ // 로그인 창 ->회원가입
		$(".sub-window").removeClass("show");
		var subWindow = $("#bg-JOIN.sub-window");
		subWindow.addClass("show");
	});
	
	$("#passwordch").on("click", function(e){ // 비밀번호 찾기 
		$(".sub-window").removeClass("show");
		var subWindow = $("#bg-PASSWORD-SEARCH.sub-window");
		subWindow.addClass("show");
	});
	
	$(".closebtn").on("click", function(){  // login colse 버튼
		$(".sub-window").removeClass("show");
		$(".sub-window form input").val('');
		$(".sub-window form select").val(0);
	});
	
	$.validator.addMethod(
	    "checkPassword",
	    function (value, element) {
	    	var pattern = RegExp(/^(?=.*[a-z])(?=.*[^A-Z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"])[a-z\d\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]{8,25}$/);	
	    	if(pattern.test(value)){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    "6자리 이상 소문자/숫자/특수기호를 반드시 포함해주세요."
	);
	$.validator.addMethod(
	    "checkName",
	    function (value, element) {
	    	var pattern = RegExp(/^[가-힣a-zA-Z\s]+$/);	
	    	if(pattern.test(value)){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    "한글명 또는 영문명만 가능합니다."
	);
	
	/*로그인 유효성검사*/
	$("#campaign_loginform").validate({
		rules: {
			id: {required: true, email: true},
			password : {required: true}
				},
	    messages: {
	    	id: {
	            required: "가입하신 이메일 주소를 입력해주세요."
	          , email: "유효하지 않은 이메일입니다"
	        },
	        password: {
	            required: "비밀번호를 입력해주세요."
	        }
	    },
        onkeyup: function(element, event) {
            this.element(element); // triggers validation
        },
	    submitHandler: function(form) {
	    	var remember = $("#Remember-check").is(":checked");
	    	var dataSet = {
	    			uId : CryptoJS.SHA256($("#uId").val()).toString(),
	    			uPw : CryptoJS.SHA256($('#uPw').val()).toString()
	    	}
	    	var remember = $("#Remember-check").is(":checked");
			if(remember==true){
				localStorage.removeItem("rememberId");
				localStorage.removeItem("rememberPw");
				localStorage.setItem("rememberId",$("#uId").val());
				localStorage.setItem("rememberPw",$("#uPw").val());
			} else {
				localStorage.removeItem("rememberId");
				localStorage.removeItem("rememberPw");
			}
			$.ajax({
				url:'/member/check/id',
				type : 'get',		
				dataType : "json",
				data : dataSet,
				success:function(data){
					if(data.cnt == 0){
						alert("존재하지 않는 사용자입니다.\n아이디와 비밀번호를 다시 확인해주세요.");
						localStorage.removeItem("rememberPw");
						$("input").blur();
						location.reload();
					}else if(data.cnt == 1){
						alert("로그인에 성공하였습니다.");
						form.submit();
					}
				}, error : function() {
				}
			}); 
	    }
	}); 
	
	$("#submitLOGIN").on("click", function(){
		$("#campaign_loginform").submit();
	});	
	
	$(document).on('keypress',function(e) {
	    if(e.which == 13) {
	    	if($("#bg-LOGIN").hasClass("show")){
	    		$("#campaign_loginform").submit();
	    	}
	    }
	});
	
	/*회원가입 유효성검사*/
	$("#campaign_joinform").validate({
		rules: {
			join_id : {required: true, email: true},
			join_pw : {required: true, checkPassword: true},
			join_pwchk : {required:true, equalTo: "#join_pw"},
			uNm : {required:true},
			uHp : {required:true, number: true, minlength: 9, maxlength:11}
				},
	    messages: {
	    	join_id: {
	            required: "가입하실 이메일 주소를 입력해주세요.",
	            email: "유효하지 않은 이메일입니다"
	        },
	        join_pw: {
	            required: "비밀번호를 입력해주세요."
	        },
	        join_pwchk: {
	            required: "입력한 비밀번호와 동일해야 합니다.",
            	equalTo: "입력한 비밀번호와 동일해야 합니다."
	        },
	        uNm : {
	        	required:"이름을 입력해주세요."
        	},
        	uHp : {
        		required:"휴대전화 번호를 입력해주세요.",
        		number: "숫자만 입력해야합니다.",
        		minlength:"적어도 9자리 번호를 입력해야합니다.",
        		maxlength:"휴대전화 번호는 11자리를 넘을 수 없습니다."
    		}
	    },
        onkeyup: function(element, event) {
            this.element(element); // triggers validation
        },
	    submitHandler: function(form) {
	    	var uId=$("#join_id").val();
	    	if(checkCertification(uId)==false){
				alert('이메일 인증을 진행해주세요.');
				return false;
			}
	    	
	    	if($("input:checkbox[name=idGenAgr]").is(":checked") == false) {
				alert('DATARGET은 모든 이용약관에\n동의하신 후 이용 가능합니다.');
				return false;
			}
	    	deleteCertification(uId);
	    	form.submit();
	    }
		
	});
	
	
	$("#submitJOIN-GO").on("click", function(){
		if(confirm("회원가입을 하시겠습니까?")){
			$("#campaign_joinform").submit();
		}
	});
	
	$("#campaign_joinform").keydown(function(key) {
		if(key==13){
			if(confirm("회원가입을 하시겠습니까?")){
				$(this).submit();
			}
		}
	});
	
	
	/*비밀번호 찾기 유효성검사*/
	$("#campaign_pwchkform").validate({
		rules: {
			pwchk_id : {required: true, email: true},
			pwchk_name : {required:true, checkName: true},
		},
	    messages: {
	    	pwchk_id: {
	            required: "가입하신 이메일 주소를 입력해주세요.",
	            email: "유효하지 않은 이메일입니다"
	        },
	        pwchk_name: {
	        	required:"이름을 입력해주세요."
	        },
	    },
        onkeyup: function(element, event) {
            this.element(element); // triggers validation
        },
	    submitHandler: function(form) {
	    	var uId=$("#pwchk_id").val();
			var uNm=$("#pwchk_name").val();
	    	$.ajax({
				url:'/member/check/id',
				type : 'get',		
				dataType : "json",
				async:false,
				data : {uId : CryptoJS.SHA256(uId).toString(),},
				contentType: "application/json; charset=UTF-8",
				success:function(data){
					if(data.cnt < 1){
						alert("없는 ID 입니다. 이메일을 확인해주세요.");
					}else if(uId!=null && data.cnt > 0){
						$.ajax({
							url:'/member/find/password',
							type : 'get',		
							dataType : "json",
							async:false,
							data : {pwchk_id : CryptoJS.SHA256(uId).toString(), pwchk_name:uNm},
							contentType: "application/json; charset=UTF-8",
							success:function(data){
								alert(data.message);
								if(data.mFlag){
									location.href="/";
								}
							}
						});
					}
				}, error : function() {
				}
			});
	    }
	});
	
	$("#pwchkSubmit").on("click", function(){
		if(confirm("비밀번호 찾기를 진행하시겠습니까?")){
			$("#campaign_pwchkform").submit();
		}
	});
	
	$("#campaign_pwchkform").keydown(function(key) {
		if(key==13){
			if(confirm("비밀번호 찾기를 진행하시겠습니까?")){
			$(this).submit();
			}
		}
	});
	
	/*비밀번호 재설정 유효성검사*/
	$("#member_pwChangeForm").validate({
		rules: {
			uPw : {required: true, checkPassword: true},
			pwchkChange_pw : {required:true, equalTo: "#pwChange_pw"}
				},
	    messages: {
	    	uPw: {
	            required: "재설정할 비밀번호를 입력해주세요."
	        },
	        pwchkChange_pw: {
	            required: "입력한 비밀번호와 동일해야합니다.",
            	equalTo: "입력한 비밀번호와 동일해야합니다."
    		}
	    },
        onkeyup: function(element, event) {
            this.element(element); // triggers validation
        },
	    submitHandler: function(form) {
	    	var formData = $("#member_pwChangeForm").serialize();
	    	var text = $('.PwdSameCk').text();
	    	var Uid = text.trim();   	
	    	var data = { uId : CryptoJS.SHA256(Uid).toString() }
	    	var beforePW;
	    	
	    	$.ajax({ //이전 동일 비밀번호 체크
				url:"/member/change/passwordSameCk",
				data: data,
				dataType : 'json', 
				async: false,
				type:"GET",
				error: function(request, status, error){
			         console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
			    },	
				success:function(data){
					beforePW = data.beforePW;
				}
			});
	    	
	    	if(CryptoJS.SHA256($('#pwchkChange_pw').val()).toString() == beforePW){
	    		alert("입력하신 비밀번호는 이전에 사용 하시던 비밀번호와 동일합니다.\n비밀번호를 다시 입력해 주세요.");
	    	}
	    	else{
	    		$.ajax({ //비밀번호 변경ajax
					url:"/member/change/password",
					data:{uId : CryptoJS.SHA256($("#pwChange_id").val()).toString(),uPw : CryptoJS.SHA256($("#pwChange_pw").val()).toString()},
					type:"get",
					success:function(data){
						localStorage.removeItem("rememberPw");
						alert("정상적으로 변경되었습니다. 로그인을 해주세요");
						location.href="/";
					}
				});
	    	}
	    }
	});
	
	$("#pwChange").on("click", function(){
		if(confirm("비밀번호를 재설정하시겠습니까?")){
		$("#member_pwChangeForm").submit();
		}
	});
	
	$("#member_pwChangeForm").keydown(function(key) {
		if(key==13){
			if(confirm("비밀번호를 재설정하시겠습니까?")){
			$(this).submit();
			}
		}
	});
	
	$("#inquireSubmit").on('click', inquireSubmit);
	
}

function inquireSubmit(){
	var email = $('#inq-email').val()
	if(email==null || email==''){
		alert("이메일 입력은 필수사항입니다.");
		$('#inq-email').focus();
		return;
	}
	
	var title = $('#inq-title').val()
	if(title==null || title==''){
		alert("제목 입력은 필수사항입니다.");
		$('#inq-title').focus();
		return;
	}

	var contents = $('#inq-contents').val()
	if(contents==null || contents==''){
		alert("내용 입력은 필수사항입니다.");
		$('#inq-contents').focus();
		return;
	}
	
	if(confirm("제출 하시겠습니까? 이후 내용 수정은 불가합니다.")){
		alert("제출하였습니다.");
		document.inquireForm.submit();
	}
}

function smthcroll(id){
	var location = document.querySelector("#"+id).offsetTop-88;
	window.scrollTo({top:location, behavior:'smooth'});
	$(".smthcroll").removeClass("active");
	$("."+id).addClass("active");
}

function certify(){
	var email = $("#join_id").val();
	var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	if (!regExp.test(email)) {
	}else{
		$("#join_idConfirmMsg").text("");
		if(emailConfirm(email)==true){
			if(confirm("사용 가능한 이메일입니다. 확인을 누르시면 입력하신 이메일을 통해 이메일 인증이 진행됩니다.")){
				//이메일 인증 진행
				if(emailCertification(email)==true){
					alert("이메일 인증 메일을 발송하였습니다. 메일을 통해 인증을 진행해주세요. 인증 만료시간은 10분입니다.");
				}else{
					alert("이메일 인증을 이미 요청하였습니다. 인증 만료시간은 10분입니다.");
				}
			}else{
				alert("이메일 인증을 취소하셨습니다.");
			}
		}else{
			alert("이미 사용중인 이메일입니다. 다른 이메일로 인증해주세요.");
		}
	}
}

function emailConfirm(email){
	var flag = false;
	$.ajax({
		url:'/member/check/id',
		type : 'get',		
		dataType : "json",
		async:false,
		data : {uId : CryptoJS.SHA256(email).toString()},
		contentType: "application/json; charset=UTF-8",
		success:function(data){
			if(data.cnt>0){
				//중복
				console.log("emailConfirm : false")
				flag=false;
			}else{
				//중복없음
				console.log("emailConfirm : true")
				flag=true;
			}
		}, error : function() {
		}
	});
	return flag;
}

function emailCertification(email){
	var flag = false;
	$.ajax({
		url:'/member/certify/email',
		type : 'get',		
		dataType : "json",
		async:false,
		data : {email : email},
		contentType: "application/json; charset=UTF-8",
		success:function(data){
			if(data.cnt>0){
				//이메일 인증 데이터 삽입 성공 + 이메일 발송 성공
				console.log("emailCertification : true")
				flag=true;
			}else{
				//이메일 인증 데이터 존재 확인 필요
				console.log("emailCertification : false")
				flag=false;
			}
		}, error : function() {
		}
	});
	return flag;
}

function checkCertification(email){
	var flag = false;
	$.ajax({
		url:'/member/check/certification',
		type : 'get',		
		dataType : "json",
		async:false,
		data : {email : CryptoJS.SHA256(email).toString()},
		contentType: "application/json; charset=UTF-8",
		success:function(data){
			if(data.cnt>0){
				//이메일 인증 확인 완료
				console.log("checkCertification : true")
				flag=true;
			}else{
				//이메일 인증 확인 실패
				console.log("checkCertification : false")
				flag=false;
			}
		}, error : function() {
		}
	});
	return flag;
}

function deleteCertification(email){
	$.ajax({
		url:'/member/delete/certification',
		type : 'get',		
		dataType : "json",
		async:false,
		data : {email : CryptoJS.SHA256(email).toString()},
		contentType: "application/json; charset=UTF-8",
		success:function(data){
				//이메일 인증 정보 삭제
				console.log("deleteCertification : true")
		}, error : function() {
		}
	});
}

function openRule(){
	$("#tosModal").modal("show");
}