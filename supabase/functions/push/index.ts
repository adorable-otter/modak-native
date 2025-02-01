import { createClient } from 'jsr:@supabase/supabase-js@2'

interface Notification {
  id: string
  user_id: string
  body: string
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Notification
  schema: 'public'
  old_record: null | Notification
}

const supabase = createClient(
  Deno.env.get('EXPO_PUBLIC_SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const TABLEBYTYPE = {
  group_members_new: 'group_members',
  schedules_new: 'schedules'
}

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const { data:groupMembersData } = await supabase
    .from('group_members')
    .select()
    .eq('group_id', payload.record.group_id)
    .eq('user_id', payload.record.target_user_id)
    .single();

  //알림 설정이 꺼져있으면 early return한다
  if(!groupMembersData?.receive_notifications) return;
  
  const { data } = await supabase
    .from('users')
    .select('push_token')
    .eq('id', payload.record.target_user_id)
    .single();
  
  const { data:groupData } = await supabase
    .from('groups')
    .select('name')
    .eq('id', payload.record.group_id)
    .single();

  const { data:triggeredRow } = await supabase
    .from(TABLEBYTYPE[payload.record.type])
    .select()
    .eq('id', payload.record.triggered_row_id)
    .single();

  //알림 타입에 따라 메세지 설정하기
  const message = {
    title: '',
    body: '',
  }

  if(payload.record.type === 'group_members_new') {
    const { data:newMemberData } = await supabase
      .from('users')
      .select('nickname')
      .eq('id', triggeredRow?.user_id)
      .single();

      message.title = '새로운 멤버가 들어왔어요';
      message.body = `${groupData?.name}에 '${newMemberData?.nickname}'님이 멤버가 되었어요`;
  }

  if(payload.record.type === 'schedules_new'){
    message.title = '일정이 등록되었어요';
    message.body = `${groupData?.name}에 '${triggeredRow?.name}'일정이 생겼어요`
  }

  //알림 보내기
  const {title:notificationTitle, body:notificationBody} = message;

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('EXPO_PUBLIC_ACCESS_TOKEN')}`,
    },
    body: JSON.stringify({
      to: data?.push_token,
      sound: 'default',
      title: notificationTitle,
      body: notificationBody,
    }),
  }).then((res) => res.json())

  return new Response(JSON.stringify(res), {
    headers: { 'Content-Type': 'application/json' },
  })
})

