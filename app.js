const invitation = document.querySelector('#invitation');
const proposal = document.querySelector('#proposal');
const declined = document.querySelector('#not-now');
const noButton = document.querySelector('#no');
const note = document.querySelector('#playful-note');
let noCount = 0;
function show(view) {
  invitation.hidden = view !== 'invitation';
  proposal.hidden = view !== 'proposal';
  declined.hidden = view !== 'declined';
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function openProposal() {
  show('proposal');
  document.querySelector('#proposal-title').focus({ preventScroll: true });
}
show('invitation');
document.querySelector('#back-to-invite').hidden = false;
document.querySelector('#yes').addEventListener('click', openProposal);
document.querySelector('#reopen').addEventListener('click', openProposal);
noButton.addEventListener('click', () => {
  noCount += 1;
  const scales = [0.78, 0.55, 0.32, 0];
  noButton.style.transform = `scale(${scales[Math.min(noCount - 1, 3)]})`;
  note.textContent = ['앗, 조금만 더 생각해 주실래요?', '어라, 버튼이 작아지고 있어요.', '제안만 살짝 읽어보셔도 좋아요.', '버튼은 사라졌지만, 선택은 언제나 자유예요.'][Math.min(noCount - 1, 3)];
  if (noCount >= 4) {
    noButton.hidden = true;
    document.querySelector('#decline').focus({ preventScroll: true });
  }
});
document.querySelector('#decline').addEventListener('click', event => {
  event.preventDefault();
  show('declined');
  document.querySelector('#reopen').focus({ preventScroll: true });
});
document.querySelector('#back-to-invite').addEventListener('click', () => {
  noCount = 0;
  noButton.hidden = false;
  noButton.style.transform = '';
  note.textContent = '‘예’를 누르면 자세한 제안을 볼 수 있어요.';
  show('invitation');
  document.querySelector('#yes').focus({ preventScroll: true });
});
const recipient = 'verifylab2526@gmail.com';
const subject = '[Daylist] 크리에이터 협업 참여 문의';
const body = `안녕하세요, 베리파이랩 담당자님.\nDaylist 협업 제안을 확인하고 연락드립니다.\n\n이름 / 활동명:\n인스타그램 계정 링크:\n사용 중인 휴대폰 기종:\n테스트 참여 및 촬영 가능한 일정:\n궁금한 점:\n\n릴스 1편 제작·게시와 총 협업비 100,000원(선입금 50,000원 / 게시 완료 후 50,000원) 제안을 확인했습니다.\n세부 일정과 최종 조건을 안내 부탁드립니다.\n감사합니다.`;
document.querySelector('#reply-mail').href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#email-status');
  try {
    await navigator.clipboard.writeText(recipient);
    status.textContent = '이메일 주소를 복사했어요. Gmail에서 붙여 넣어 주세요.';
  } catch {
    status.textContent = `주소를 길게 눌러 복사해 주세요: ${recipient}`;
  }
});
