import style from "./style.module.less"

const Sticky = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>sticky</h2>
        <article className={style.content}>
          {data.map(({ title, content }) => (
            <section>
              <h4 className={style.title}>{title}</h4>
              <div>
                <p>{content}</p>
              </div>
            </section>
          ))}
        </article>
      </div>
      <div className={style.test2}>
        <div className={style.nav}>
          <nav>导航</nav>
        </div>

        <div className={style["flow-box"]}></div>
      </div>
    </div>
  )
}

const data = [
  {
    title: "网曝王宝强殴打马蓉",
    content:
      "12月2日，有网友爆料称王宝强对马蓉施暴，状况严重，且马蓉目前已被送往某医院急诊。新浪娱乐第一时间赶往医院见到马蓉和其母亲，马蓉右边脸部以及眼睛周围有明显伤痕，嘴唇以及手掌也有淤血痕迹，其母额角红肿也较明显。据马蓉描述，王宝强和四五个同伴于今早一起对其拳打脚踢，踢打其头部、后脖、颈椎、掰扯其手部，撕扯嘴巴，甚至对马蓉妈妈施暴。",
  },
  {
    title: "知情人爆料称马蓉闯入王宝强家拿剪刀对峙",
    content: `12月2日，有网友爆料马蓉被王宝强施暴。经多方求证，搜狐娱乐从知情人士口中获悉，“目前网络上有关马蓉伤势的那些图，都是马蓉摆拍的。她跑到王宝强家闹事，还吓晕了王宝强妈妈，拿碎玻璃威胁警察，现场冲突很激烈。”
    知情人士了解，马蓉和王宝强发生冲突的起因是，马蓉跑到王宝强家闹事。她不仅拍照、翻东西，拿剪刀撕毁东西，辱骂王宝强表妹，还拿剪刀对峙，吓晕了王宝强母亲，王宝强无奈才报警的。目前王宝强妈妈已经送往北京某医院就诊。
    “王宝强在无奈之下报警，警察来了之后，双方对峙七八个小时，孩子在外面喊，马蓉还是不开门。后来王宝强把门撞开，门周围的玻璃碎了一地，马蓉还把玻璃捡起来威胁警察，说要划伤自己，然后拿手机说要现场直播。还出口辱骂王宝强表妹，说对方作孽做太多了，才导致妈妈去世，还骂对方死了上面死下面。”
    据悉，现场冲突很激烈，整整一夜。最后马蓉自己打了120，而120来了`,
  },
]

export default Sticky
