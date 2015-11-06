//
//  ViewController.swift
//  myJW
//
//  Created by Apps Tester on 10/28/15.
//  Copyright © 2015 Michalik. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var myWebView: UIWebView!

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let path = NSBundle.mainBundle().pathForResource("index", ofType: "html")
        var url = NSURL(fileURLWithPath: path!)
        url = NSURL(string: "#", relativeToURL: url)!
        let requestOBJ = NSURLRequest(URL: url)
        myWebView.loadRequest(requestOBJ)
    }

    @IBAction func todayBtn(sender: AnyObject) {
        let path = NSBundle.mainBundle().pathForResource("index", ofType: "html")
        var url = NSURL(fileURLWithPath: path!)
        url = NSURL(string: "#today", relativeToURL: url)!
        let requestOBJ = NSURLRequest(URL: url)
        myWebView.loadRequest(requestOBJ)
    }
    @IBAction func readerBtn(sender: AnyObject) {
        let path = NSBundle.mainBundle().pathForResource("index", ofType: "html")
        var url = NSURL(fileURLWithPath: path!)
        url = NSURL(string: "#schedule", relativeToURL: url)!
        let requestOBJ = NSURLRequest(URL: url)
        myWebView.loadRequest(requestOBJ)
    }
    @IBAction func settingsBtn(sender: AnyObject) {
        let path = NSBundle.mainBundle().pathForResource("index", ofType: "html")
        var url = NSURL(fileURLWithPath: path!)
        url = NSURL(string: "#settings", relativeToURL: url)!
        let requestOBJ = NSURLRequest(URL: url)
        myWebView.loadRequest(requestOBJ)
    }
}

