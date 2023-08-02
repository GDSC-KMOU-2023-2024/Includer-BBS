"use strict";

if(document.location.pathname.startsWith('/board_read/')) {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-3 board-content">
                    <div class="row gap-5">
                        ` + bbs_nav() + `
                        <div class="col-xxl-9 p-4 shadow rounded-5">
                            <div class="container px-1">
                                <h3 class="mb-0">` + xss_filter(text.title) + `</h3>
                                    <div class="d-flex justify-content-between border-bottom py-2">
                                        <div>
                                            <span class="board__add-write">`+ xss_filter(text.user_name_real) + `</span>
                                            <span class="board__add-date px-3">` + text.date + `</sapn>
                                        </div>
                                        <div>
                                            <span class="boardread_left">
                                            <i class="fa-regular fa-pen-to-square text-success"></i>
                                            <a class="text-decoration-none text-success" href="/board_edit/` + url_encode   (board_name) + `/` + url_encode(board_id) + `">수정 및 삭제</a>
                                            </span>
                                        </div>
                                    </div>
                                <p class="lead">` + text.render_content + `</p>
                                <hr>
                                <div class="border p-3 rounded-4 bg-light" style="height:180px;">
                                    <p class="px-2 mb-2 fw-bold comment__title">댓글</p>
                                    <textarea id="board_add_content" class="form-control form-control-sm mb-2" rows="4" placeholder="댓글 내용을 입력하세요." aria-label="내용" ></textarea>
                                    <button class="comment__registration rounded btn btn-success py-0" type="submit">등록</button>
                                </div>
                                <br>
                                <button type="submit" class="btn btn-success" id="board_add_save">저장</button> 
                                <button type="submit" class="btn btn-outline-success me-2" id="board_add_preview">미리보기</button>
                                <br>
                                <br>
                                <div id="board_add_preview_field"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        hljs.highlightAll();
        func_board_preview();
    });
}