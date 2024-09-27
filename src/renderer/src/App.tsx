import { useEffect, useState } from 'react'
import { Button, Input, Select, message } from 'antd'

const { TextArea } = Input

const types = ['File', 'Directory']
function App(): JSX.Element {
  const [type, setType] = useState(types[0])
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  /** 弹窗控制 */
  const [messageApi, contextHolder] = message.useMessage()

  /** 点击提交 */
  const ipcHandle = () => {
    /** 给主进程发送消息 */
    window.electron.ipcRenderer.send('ping', { type, url })
    setLoading(true)
  }

  useEffect(() => {
    /** 接收主进程发送的消息 */
    window.electron.ipcRenderer.on('msg', (_, msg) => {
      setLoading(false)
      messageApi.info(msg)
    })
  }, [])

  return (
    <>
      {contextHolder}
      <div
        className="flex flex-col gap-4 mx-auto"
        style={{ margin: '0 auto', maxWidth: '90%', width: 800, display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <Select
          size="large"
          className="w-full"
          style={{ width: '100%' }}
          value={type}
          options={types.map((t) => ({ value: t, lable: t }))}
          onChange={(e) => {
            setType(e)
          }}
        />
        <TextArea
          rows={10}
          placeholder=""
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <Button
          className="w-full"
          style={{ width: '100%' }}
          type="primary"
          loading={loading}
          onClick={ipcHandle}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default App
