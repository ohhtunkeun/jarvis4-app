// 자비스 - 개인용 주식 매매 앱 (ADHD 친화 설계)
// 주요 목적: 충동 매매 차단 + 점수 기반 감시 종목 표시 + 관망 자동 판정 시스템 반영 + 모바일 최적화

import React, { useState } from 'react';

const 감시종목예시 = [
  { 종목명: '한화비전', 점수: 72, 예측확률: 0.71, 현재가: 48000, 평단가: 49793 },
  { 종목명: '솔트룩스', 점수: 58, 예측확률: 0.68, 현재가: 7600, 평단가: 8500 },
  { 종목명: '포스코DX', 점수: 80, 예측확률: 0.73, 현재가: 34800, 평단가: 36500 },
];

function 판단(종목) {
  const 관망조건 = 종목.점수 < 70 || 종목.예측확률 < 0.7 || 종목.현재가 < 종목.평단가;
  return 관망조건 ? '관망' : '매수 가능';
}

export default function 자비스앱() {
  const [종목목록] = useState(감시종목예시);

  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>
        📊 자비스 - 감시 종목
      </h1>
      {종목목록.map((item, index) => {
        const 상태 = 판단(item);
        const 버튼비활성화 = 상태 === '관망';

        return (
          <div key={index} style={{ background: '#fff', margin: '1rem 0', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontWeight: '600' }}>{item.종목명}</div>
            <div style={{ fontSize: '0.9rem' }}>점수: {item.점수}점</div>
            <div style={{ fontSize: '0.9rem' }}>예측 확률: {(item.예측확률 * 100).toFixed(1)}%</div>
            <div style={{ fontSize: '0.9rem' }}>
              현재가: {item.현재가.toLocaleString()}원 / 평단가: {item.평단가.toLocaleString()}원
            </div>
            <div style={{ fontWeight: 'bold', color: 상태 === '매수 가능' ? 'green' : 'gray' }}>{상태}</div>
            <button disabled={버튼비활성화} style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: 버튼비활성화 ? '#eee' : '#fff' }}>
              {버튼비활성화 ? '관망 중' : '매수하기'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
