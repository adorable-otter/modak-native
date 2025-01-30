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

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json()
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

  const messages = {
    'group_members_new':`${groupData?.name}에 새로운 멤버가 들어왔습니다`,
    'schedules_new':`${groupData?.name}에 새로운 일정이 등록되었습니다`
  }

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('EXPO_PUBLIC_ACCESS_TOKEN')}`,
    },
    body: JSON.stringify({
      to: data?.push_token,
      sound: 'default',
      body: messages[payload.record.type],
    }),
  }).then((res) => res.json())

  return new Response(JSON.stringify(res), {
    headers: { 'Content-Type': 'application/json' },
  })
})

