import React, { useState, useContext, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import slideDown from "../../assets/images/scroll.png";
import icon1 from "../../assets/images/milk.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import demo1 from "../../assets/images/demo1.png";
import logoW from "../../assets/images/logoWhite.png";
import sl1 from "../../assets/images/sl1.png";
import sl2 from "../../assets/images/sl2.png";
import sl3 from "../../assets/images/sl3.png";
import sl4 from "../../assets/images/sl4.png";
import sl5 from "../../assets/images/sl5.png";
import leftControl from "../../assets/images/left.png";
import rightControl from "../../assets/images/right.png";
import coconut from "../../assets/images/coconut.png";
import cradle from "../../assets/images/cradle.png";
import twiter from "../../assets/images/twitterSmall.png";
import profile from "../../assets/images/profileSm.png";
import profile1 from "../../assets/images/profile1.png";
import profile2 from "../../assets/images/profile2.png";
import profile3 from "../../assets/images/profile3.png";
import profile4 from "../../assets/images/profile4.png";
import profile5 from "../../assets/images/profile5.png";
import pots from "../../assets/images/potImg.png";
import contact1 from "../../assets/images/contact1.png";
import contact2 from "../../assets/images/contact2.png";
import contact3 from "../../assets/images/contact3.png";
import SlideLeft from "../../assets/images/leftSlideMain.png";
import SlideRight from "../../assets/images/rightSlideMain.png";
import { Link } from 'react-router-dom';
import  "./homePage.css";

const HomePage = () => {

  const scrollToBottom = () => {
    const bottomElement = document.getElementById('bottom');
    if (bottomElement) {
      bottomElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [scrolled, setScrolled] = useState(false);

  const [tabOneValue, setTabOneValue] = useState(true);
  const [tabTwoValue, setTabTwoValue] = useState(false);
  const setTabOneValueFn = () => {
    setTabOneValue(true);
    setTabTwoValue(false);
  }
  const setTabTwoValueFn = () => {
    setTabOneValue(false);
    setTabTwoValue(true);
  }

  useEffect(() => {
    const handleScroll = () => {
      const footerHeight = 370;
      const offset = 20;
      const footerStartPoint = document.body.scrollHeight - window.innerHeight - footerHeight + offset;
      if (window.scrollY >= 110 && window.scrollY < footerStartPoint) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <div className="dashboardWraper" style={{ textAlign: "left" }}>
      <div className="bannerWrapers">
        <Header />
        {scrolled && (
           <Link to="/in-store"><span className='orderNowBtns'><img src={logoW} alt='' className='ordersImg'/> Order Now</span></Link>          
        )}
        
        <div className="bannertextWraper">
          <p>ارثنا منتجات</p>
          <h4>المستقبــــــل</h4>
        </div>
        <div className="slideDownBtnWraper">
          <p>تنزلق</p>
          <span className="scrollDown" onClick={scrollToBottom}>
            <img src={slideDown} alt="" />
          </span>
        </div>
      </div>
      <div className="afterBanner left">
        <div className="afterBannerTextWraper">
          <h4>تعريف سواني</h4>
          <h5>جمع السَّانِيَةِ وهي النَّاقَةُ الَّتِي يُسْتَقَى عَلَيْها</h5>
          <h6>في الماضي</h6>
          <p>تحتل الإبل مكانة مميزة في تاريخ وتراث العرب، وهي مكانة تعود إلى مايقرب ١٨٠٠ سنة فيعتبر من أقدم الحيوانات التي استأنسها الإنسان، واستطاع أن يسخرها لخدمته في النقل والغذاء وغيرها حيث تعتبر الابل رفيقة البدوي في حياته وحله وترحاله، لما حباه به الله من قدرة على الحياة في الصحراء، والتكيف مع طبيعتها القاسية من حر الشديد وندرة المياه والشمس المحرقة</p>
         </div>
      </div>

      <div className="afterBanner right">
        <div className="afterBannerTextWraper">
          <h4>تعريف سواني</h4>
          <h5>جمع السَّانِيَةِ وهي النَّاقَةُ الَّتِي يُسْتَقَى عَلَيْها</h5>
          <h6>في الحاضر والمستقبل</h6>
          <p>تحتل الإبل مكانة مميزة في تاريخ وتراث العرب، وهي مكانة تعود إلى مايقرب ١٨٠٠ سنة فيعتبر من أقدم الحيوانات التي استأنسها الإنسان، واستطاع أن يسخرها لخدمته في النقل والغذاء وغيرها حيث تعتبر الابل رفيقة البدوي في حياته وحله وترحاله، لما حباه به الله من قدرة على الحياة في الصحراء، والتكيف مع طبيعتها القاسية من حر الشديد وندرة المياه والشمس المحرقة</p>
         </div>
      </div>

      <div className="afterBanner center">
        <div className="afterBannerCenterTextWraper">
          <h4>قصتنا</h4>
          <p>استخدم أجدادنا المكونات الأصلية والثمينة لصنع أكثر حليب الإبل كريمة ولذيذة. مع تقدمنا في العمر، كافحنا للعثور على حليب يقارن بالطعام الفائق الأصلي. لذا فكرنا، لماذا نعيد اختراع العجلة؟ عنلة وصحية. في إطار سعينا لخلق أفضل حليب جمل، لم يكن علينا البحث بعيداً عن أسلاف تذكرنا المذاق الرائع والفوائد الصحية الهائلة التي اكتسبها أجدادنا من تناول هذا المشروب المغذي، وسعينا لاستعادة هذه الفوائد نفسها إلى عالمنا الحالي محليا وعالميا.</p>
          <p>استخدم أجدادنا المكونات الأصلية والثمينة لصنع أكثر حليب الإبل كريمة ولذيذة. مع تقدمنا في العمر، كافحنا للعثور على حليب يقارن بالطعام الفائق الأصلي. لذا فكرنا، لماذا نعيد اختراع العجلة؟ عندما نظرنا بشكل أقرب إلى جميع أنواع الحليب التي تقدمها الصناعة علمنا أن هناك طريقة أفضل. طريقة كاملة وصحية. في إطار سعينا لخلق أفضل حليب جمل، لم يكن علينا البحث بعيداً عن أسلافنا.<br /> ت إلى عالمنا الحالي محليا وعالميا.</p>
          </div>
      </div>

      <div className="sliderSection oneSlider" >
        <div className="rowSec">
          <div className="leftSection">
            <div className="sliderWraper heartsBackdrop">
              <span className='sliderControls'>
                  <span className='leftControl'>
                    <img src={leftControl} className='controlImgs' alt='' />
                  </span>
                <span className='rightControl'>
                <span className='leftControl'>
                    <img src={rightControl} className='controlImgs' alt='' />
                  </span>
                </span>
              </span>
              <div className="individualSliders">
                <div className="headingsWraper">
                  <span>
                    <img src={icon2} className='secIcons' alt="" />
                  </span>
                  <h4>الفوائد الصحية</h4>
                </div>
                <div className="contentWraper">
                  <p className='subHeads'>للقلب</p>
                <p>حليب الإبل غني بالعديد من العناصر الغذائية المهمة للل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر المزيد من فيفيتامين والحديد والبوتاسيوم، كما أنه مصدر جيد</p>
                </div>
              </div>


            </div>
            <div className="staticSection">
              <div className="headingsWraper">
                <span>
                  <img src={icon3} className="thirdIcons" alt="" />
                </span>
                <h4>الفوائد الصحية</h4>
              </div>
              <div className="contentWraper">
                <p>حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، فيتامينC وفيتامين B والكالسيوم والحديد والبوتاسيوم، كما أنه مصدر جيد للدهون الصحية، مثل الأحماض الدهنية وحمض اللينوليك والأحماض الدهنية غير المشبعة، والتي قد تدعم صحة الدماغ والقلب.</p>
              </div>
            </div>
          </div>
          <div className="rightSection">
            <div className="innerTextWraper">
              <div className="headingsWraper">
                <span>
                  <img src={icon1} className='fstIcon' alt="" />
                </span>
                <h4>منتجاتنا</h4>
              </div>
              <p>حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر المزيد من فيتامينC وفيتامين B والكالسيوم والحديد والبوتاسيوم، كما أنه مصدر جيد للدهون الصحية، مثل الأحماض الدهنية وحمض اللينوليك والأحماض الدهنية غير المشبعة، والتي قد تدعم صحة الدماغ والقلب.حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكرب</p>
              </div>
          </div>
        </div>
      </div>

      <div className='midSliderWraper'>
      <div className="rowSec">

      <div className='rightContentSec'>
          <span className='rightSideImgWraper'>
            <img src={coconut} alt='' />
          </span>
        </div>
        <div className='leftContentSec '>
          <div className='contentWrapers'>
            <div className='indPointsMini'>
              <h3>رؤيتنا</h3>
              <p>حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر</p>
            </div>
            <div className='indPointsMini'>
              <h3>رؤيتنا</h3>
              <p>حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر</p>
            </div>
            <div className='indPointsMini'>
              <h3>رؤيتنا</h3>
             <ul className='demoUl'>
              <li>
                <span className='imgWraper'>
                  <img src={demo1} alt='' />
                </span>
                <span className='subText'>إبراز كرم الضيافة السعودي والتعدد الثقافي المميز</span>
              </li>
              <li>
                <span className='imgWraper'>
                  <img src={demo1} alt='' />
                </span>
                <span className='subText'>إبراز كرم الضيافة السعودي والتعدد الثقافي المميز</span>
              </li>
              <li>
                <span className='imgWraper'>
                  <img src={demo1} alt='' />
                </span>
                <span className='subText'>إبراز كرم الضيافة السعودي والتعدد الثقافي المميز</span>
              </li>
             </ul>
            </div>
          </div>
          <div className='sliderDots'>
            <ul className='sliderDotsUl'>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className='sliderThumbnail'>
            <ul className='sliderThumbUl'>
              <li>
                <span className='thumbSpan'>
                  <img src={sl1} alt='' />
                </span>
              </li>
              <li>
                <span className='thumbSpan'>
                  <img src={sl2} alt='' />
                </span>
              </li>
              <li>
                <span className='thumbSpan'>
                  <img src={sl3} alt='' />
                </span>
              </li>
              <li>
                <span className='thumbSpan'>
                  <img src={sl4} alt='' />
                </span>
              </li>
              <li>
                <span className='thumbSpan'>
                  <img src={sl5} alt='' />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>

      <div className='tabSectionMain'>
        <div className="rowSec">
          <div className='mainTabHeaderWraper'>
            <ul className='tabUlWrapers'>
              <li className={tabOneValue ? 'active': ''} onClick={setTabOneValueFn}>فريق العمل</li>
              <li className={tabTwoValue ? 'active': ''} onClick={setTabTwoValueFn}>مجلس الإدارة</li>
            </ul>
          </div>
          {tabOneValue && (
          <div className='tabContentWrapers'>
            <div className='sliderTabsInfoWraper'>
              <span className='slideMainBtnLeft'>
                <img src={SlideLeft} className='slideBtns' />
              </span>
              <span className='slideMainBtnRight'>
              <img src={SlideRight} className='slideBtns' />
              </span>
              <span className='profileImgs first'>
                <img src={profile1} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs second'>
                <img src={profile2} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs third'>
                <img src={profile3} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs fourth'>
                <img src={profile4} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs fifth'>
                <img src={profile5} className='profileImgsPic' alt='' />
              </span>
            </div>
          </div>
          )}

        {tabTwoValue && (
          <div className='tabContentWrapers'>
            <div className='sliderTabsInfoWraper'>
              <span className='slideMainBtnLeft'>
                <img src={SlideLeft} className='slideBtns' />
              </span>
              <span className='slideMainBtnRight'>
              <img src={SlideRight} className='slideBtns' />
              </span>
              <span className='profileImgs first'>
                <img src={profile4} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs second'>
                <img src={profile5} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs third'>
                <img src={profile1} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs fourth'>
                <img src={profile2} className='profileImgsPic' alt='' />
              </span>
              <span className='profileImgs fifth'>
                <img src={profile3} className='profileImgsPic' alt='' />
              </span>
            </div>
          </div>
          )}


        </div>
      </div>
      <div className='cradleSectionMain'>
        <div className="rowSec">
          <div className='leftSection'>
            <div className='cradelInfoContent'>
              <h3>كلمة الرئيس</h3>
              <p>حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر الإبل يمكن مقارنته بحليب البقر كامل الدسم، ومع ذلك، فهو يحتوي على نسبة أقل من الدهون المشبعة ويوفر حليب الإبل غني بالعديد من العناصر الغذائية المهمة للصحة العامة، عندما يتعلق الأمر بالسعرات الحرارية والبروتينات ومحتوى الكربوهيدرات، فإن حليب الإبل يمكن مقارنته بحليب البقر كامل</p>
            </div>
            <div className='subProfileInfo'>
              <span className='userPImg'>
                <img src={profile} alt='' />
              </span>
              <span className='userPinfo'>
                <h4>عبدالله محمد <a href=''><img src={twiter} className='twiterLink' alt='' /></a></h4>
                <p>الرئيس التنفيذي لشركة السواني</p>
              </span>
            </div>
          </div>
          <div className='rightSection'>
            <img src={cradle} className='cradleImgs' alt='' />
          </div>
        </div>
        </div>
        
        <div className='countactSectionWrapers'>
          <div className="rowSec">
            <div className='leftSection'>
              <div className='blocksWraper'>
                <div className='headerSocial'>
                <h3>المركز الاعلامي</h3>
                <ul className='socialLinks'>
                    <li>
                      <a href=''>
                      <img src={contact1} alt=''/>
                      </a>
                    </li>
                    <li>
                      <a href=''>
                      <img src={contact2} alt=''/>
                      </a>
                    </li>
                    <li>
                      <a href=''>
                      <img src={contact3} alt=''/>
                      </a>
                    </li>
                  </ul>
                </div>
              
              <div className='contactFormWraper'>
                <div className='indField'>
                  <input className='formFieldsInput' type='text' placeholder='الاسم بالكامل' />
                  <i class="fa fa-user" aria-hidden="true"></i>
                </div>
                <div className='indField'>
                  <input className='formFieldsInput' type='email' placeholder='البريد الالكتروني' />
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </div>
                <div className='indField'>
                  <input className='formFieldsInput' type='text' placeholder='رقم الجوال' />
                  <i class="fa fa-mobile" aria-hidden="true"></i>
                </div>
                <div className='indField'>
                  <textarea className='formFieldsInputTextarea'placeholder='الرسالة' ></textarea>
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
                
                  <button className='submitContctForm'>ارسل</button>
                
              </div>
              </div>
            </div>
            <div className='rightSection'>
              <div className='blocksWraper'>
                <h3>المركز الاعلامي</h3>
                <div className='indBloackContent'>
                  <div className='indBlocksMain'>
                    <p>اقتصادي / صندوق الاستثمارات العامة يعلن افتتاح ثلاثة مكاتب جديدة لشركات تابعة في لندن ونيويورك وهونغ كونغ لمواصلة توسّعه العالمي</p>
                  </div>
                  <div className='blockImgs'>
                    <img src={pots} className='potsImg' />
                  </div>
                  <p className='subParaP'>تم النشر بتاريخ الخميس 2022/2/24</p>
                </div>
                <div className='indBloackContent'>
                  <div className='indBlocksMain'>
                    <p>اقتصادي / صندوق الاستثمارات العامة يعلن افتتاح ثلاثة مكاتب جديدة لشركات تابعة في لندن ونيويورك وهونغ كونغ لمواصلة توسّعه العالمي</p>
                  </div>
                  <div className='blockImgs'>
                    <img src={pots} className='potsImg' />
                  </div>
                  <p className='subParaP'>تم النشر بتاريخ الخميس 2022/2/24</p>
                </div>
                <div className='indBloackContent'>
                  <div className='indBlocksMain'>
                    <p>اقتصادي / صندوق الاستثمارات العامة يعلن افتتاح ثلاثة مكاتب جديدة لشركات تابعة في لندن ونيويورك وهونغ كونغ لمواصلة توسّعه العالمي</p>
                  </div>
                  <div className='blockImgs'>
                    <img src={pots} className='potsImg' />
                  </div>
                  <p className='subParaP'>تم النشر بتاريخ الخميس 2022/2/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      <Footer />
      <div id="bottom"></div>
    </div>

  );
};

export default HomePage;