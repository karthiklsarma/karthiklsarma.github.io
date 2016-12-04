import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Iterator;
import java.util.List;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.By.ByXPath;
import org.openqa.selenium.interactions.touch.TouchActions;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.thoughtworks.selenium.webdriven.commands.Click;


public class login {
	public static void main(String args[]) throws MalformedURLException
	{
		DesiredCapabilities dc1 = new DesiredCapabilities();
		DesiredCapabilities dc = new DesiredCapabilities();
		dc1.setCapability("automationName", "Appium");
		dc1.setCapability("platformName", "Android");
		dc1.setCapability("platformVersion", "5.0.2");
		dc1.setCapability("udid", "168644ce12b52489");
		dc1.setCapability("deviceName", "Galaxy Tab A 3");
		dc1.setCapability("app", "C:\\Users\\jaswitha\\Desktop\\factArt-debug.apk");
		dc1.setCapability("appPackage", "edu.asu.engineering.fact");
		dc1.setCapability("appActivity", "edu.asu.fact.views.MainActivity");
		AndroidDriver driver = new AndroidDriver(new URL("http://127.0.0.3:4724/wd/hub"), dc1);
		driver.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"android:id/button2\").text(\"Teacher\")").click();
		driver.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"edu.asu.engineering.fact:id/Username\")").sendKeys("fact");
		driver.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"edu.asu.engineering.fact:id/Password\")").sendKeys("qwe123");
		driver.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"android:id/button1\").text(\"Sign-in\")").click();
		// student
				dc.setCapability("automationName", "Appium");
				dc.setCapability("platformName", "Android");
				dc.setCapability("platformVersion", "4.4.2");
				dc.setCapability("udid", "43005f439a5641f1");
				dc.setCapability("deviceName", "Fact 204 (SM-P600)");
				dc.setCapability("app", "C:\\Users\\jaswitha\\Desktop\\factArt-debug.apk");
				dc.setCapability("appPackage", "edu.asu.engineering.fact");
				dc.setCapability("appActivity", "edu.asu.fact.views.MainActivity");
			 	AndroidDriver driver1 = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), dc);
		
	/*	driver1.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"android:id/button3\").text(\"Student\")").click();
		driver1.findElementByAndroidUIAutomator("new UiSelector().className(\"android.widget.EditText\")").sendKeys("jaswitha");
		driver1.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"android:id/button1\").text(\"Ok\")").click();
		*/
		driver.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"edu.asu.engineering.fact:id/action_bar_organize\").text(\"ORGANIZE\")").click();
		driver.findElementByAndroidUIAutomator("new UiSelector().resourceId(\"edu.asu.engineering.fact:id/action_bar_teacher_file_open_layout\").className(\"android.widget.LinearLayout\")").click();
		
	   System.out.println("*******");
		WebElement e= driver.findElementByAndroidUIAutomator("new UiSelector().className(\"android.widget.Button\").packageName(\"edu.asu.engineering.fact\")");
		boolean f = e.isDisplayed();
		System.out.println(f);
		/*System.out.println("loca"+e.getLocation());
		
		TouchActions a = new TouchActions(driver);
		
		a.click(e);*/
		e.click();
		System.out.println("dddd");
		//	driver.findElementByAndroidUIAutomator("new UiSelector().text(\"Add Class\").className(\"android.widget.Button\").packageName(\"edu.asu.engineering.fact\")").click();
		driver.findElementByAndroidUIAutomator("new UiSelector().text(\"Class Name\").className(\"android.widget.EditText\").packageName(\"edu.asu.engineering.fact\")").sendKeys("sample");
		driver.findElementByAndroidUIAutomator("new UiSelector().text(\"Ok\").className(\"android.widget.Button\").packageName(\"edu.asu.engineering.fact\")").click();
		driver.findElementByAndroidUIAutomator("new UiSelector().text(\"Class Organizer Name\").className(\"android.widget.EditText\").packageName(\"edu.asu.engineering.fact\")").sendKeys("sampleco");
		driver.findElementByAndroidUIAutomator("new UiSelector().text(\"Ok\").className(\"android.widget.Button\").packageName(\"edu.asu.engineering.fact\")").click();
		
		
		
		List<WebElement> m =driver.findElementsByXPath("//android.view.View[@bounds='[3,56][1024,768]']");
		Iterator<WebElement> itr = m.listIterator();
		
		while(itr.hasNext())
		{
			System.out.println("location");
			System.out.println(itr.next().getLocation());
			itr.next().getSize();
			System.out.println("name");
			System.out.println(itr.next().getText());
			
		}
		//driver.findElement(ByXPath("//android.view.View[@bounds='[3,56][1024,768]']"));
		
	}
	
}
