#! /bin/bash

echo Download fonts...
echo

wget 'https://moji-waku.com/download/kaiso_up.zip' -O ./kaiso.zip
unzip -q ./kaiso.zip -d tmpfont
rm ./kaiso.zip
mv -n ./tmpfont/kaiso_up/Kaisotai-Next-UP-B.otf ./public/fonts

wget --user-agent='Mozilla/5.0' 'https://www.fontspace.com/get/family/l2pyq' -O ./heorot.zip
unzip -q ./heorot.zip -d tmpfont
rm ./heorot.zip
mv -n ./tmpfont/Heorot-4rLK.ttf ./public/fonts

wget --user-agent='Mozilla/5.0' --referer='https://fonts2u.com/laonglaan.font' 'https://fonts2u.com/download/laonglaan.font' -O ./la.zip
unzip -q ./la.zip -d tmpfont
rm ./la.zip
mv -n ./tmpfont/LaongLaan/LaongLaan.ttf ./public/fonts

wget --user-agent='Mozilla/5.0' --referer='https://fonts2u.com/phyrexia-neue-transliteration.font' 'https://fonts2u.com/download/phyrexia-neue-transliteration.font' -O ./phy.zip
unzip -q ./phy.zip -d tmpfont
rm ./phy.zip
mv -n ./tmpfont/Phyrexia_Neue_Transliteration/PhyrexiaNeue-Transliteration.otf ./public/fonts

rm -rf ./tmpfont

echo Build LightDM theme Labradorite v$(cat version)...
echo

rm -rf ./dist
npm install

npm run build

cp LICENSE ./dist/

echo Copy theme dir...

rm -rf /usr/share/web-greeter/themes/Labradorite
mkdir /usr/share/web-greeter/themes/Labradorite
cd ./dist
cp -r . /usr/share/web-greeter/themes/Labradorite
cd /usr/share/web-greeter/themes/Labradorite
chmod -R 755 .

echo Complete!
